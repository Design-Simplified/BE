import { StatusCodes } from 'http-status-codes';

import { db as database } from '../configs/database';
import { AuthProvider, UserState } from '../constants';
import type { IAuthDTO, ITokenPayload, IVerifyEmailDTO } from '../dtos/AuthDto';
import type { ILoginWithEmailRequest, ILoginResponse } from '../dtos/UserDto';
import { ResponseError } from '../error/ResponseError';
import { QueueSender } from '../queue';
import {
  UserRepository,
  AuthMethodRepository,
  MembershipRepository,
  CouponWalletRepository,
} from '../repositories';
import { JwtToken } from '../utils/jwt-utils';
import { Validator } from '../utils/validator';
import { UserValidation } from '../validations';

export class AuthService {
  static async loginWithGoogle(request: IAuthDTO): Promise<ILoginResponse> {
    return AuthService.loginWithProvider(
      AuthProvider.GOOGLE,
      request.user.googleId,
      request,
    );
  }

  static async loginWithFacebook(request: IAuthDTO): Promise<ILoginResponse> {
    return AuthService.loginWithProvider(
      AuthProvider.FACEBOOK,
      request.user.facebookId,
      request,
    );
  }

  private static async loginWithProvider(
    provider: AuthProvider,
    providerId: string,
    request: IAuthDTO,
  ): Promise<ILoginResponse> {
    let authMethod = await AuthMethodRepository.findByProviderId(providerId);

    if (!authMethod) {
      const userEmail = request.user.email;

      if (userEmail) {
        const existingUser = await UserRepository.findByEmail(userEmail);

        if (existingUser) {
          authMethod = await AuthMethodRepository.create(
            existingUser.id,
            provider,
            providerId,
          );

          const tokenPayload: ITokenPayload = {
            userId: existingUser.id,
            state: request.user.state,
          };
          const accessToken = JwtToken.generateAccessToken(tokenPayload);

          return { accessToken };
        }
      }

      const db = database;

      try {
        const newUser = await db.$transaction(async (tx: any) => {
          const createdUser = await UserRepository.create(
            request.user.username,
            userEmail || '',
            tx,
          );

          await MembershipRepository.create(createdUser.id, tx);

          await CouponWalletRepository.create(createdUser.id, tx);

          await AuthMethodRepository.create(
            createdUser.id,
            provider,
            providerId,
            tx,
          );

          return createdUser;
        });

        const tokenPayload: ITokenPayload = {
          userId: newUser.id,
          state: request.user.state,
        };
        const accessToken = JwtToken.generateAccessToken(tokenPayload);

        return { accessToken };
      } catch (error) {
        throw error;
      }
    }

    const tokenPayload: ITokenPayload = {
      userId: authMethod.userId,
      state: request.user.state,
    };
    const accessToken = JwtToken.generateAccessToken(tokenPayload);

    return { accessToken };
  }

  static async loginWithEmail(request: ILoginWithEmailRequest): Promise<void> {
    const validData = Validator.validate(
      UserValidation.LOGIN_WITH_EMAIL,
      request,
    );

    const payload = {
      email: validData.email,
      state: validData.state,
    };

    const emailToken = JwtToken.generateEmailToken(payload);

    if (
      validData.state === UserState.BUYER ||
      validData.state === UserState.SELLER
    ) {
      QueueSender.sendEmail(
        validData.email,
        'Login Verification',
        'Login Verification',
        `<a href="${process.env.LOGIN_WITH_EMAIL_CALLBACK as string}/${emailToken}">Click here to login</a>`,
      );
    } else {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid state');
    }
  }

  static async loginWithEmailLocal(
    request: ILoginWithEmailRequest,
  ): Promise<void> {
    const validData = Validator.validate(
      UserValidation.LOGIN_WITH_EMAIL,
      request,
    );

    const payload = {
      email: validData.email,
      state: validData.state,
    };

    const emailToken = JwtToken.generateEmailToken(payload);

    if (
      validData.state === UserState.BUYER ||
      validData.state === UserState.SELLER
    ) {
      QueueSender.sendEmail(
        validData.email,
        'Login Verification',
        'Login Verification',
        `<a href="${process.env.LOGIN_WITH_EMAIL_CALLBACK_LOCAL as string}/${emailToken}">Click here to login</a>`,
      );
    } else {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid state');
    }
  }

  static async loginWithEmailCallback(
    request: IVerifyEmailDTO,
  ): Promise<ILoginResponse> {
    const payload = JwtToken.verifyEmailToken(request.emailToken);

    const email = payload.email;
    const state = payload.state;

    if (!email || !state) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, 'Unauthorized!');
    }

    let user = await UserRepository.findByEmail(email);

    if (!user) {
      const db = database;

      try {
        user = await db.$transaction(async (tx: any) => {
          const createdUser = await UserRepository.create(
            email.split('@')[0],
            email,
            tx,
          );

          await MembershipRepository.create(createdUser.id, tx);

          await CouponWalletRepository.create(createdUser.id, tx);

          return createdUser;
        });
      } catch (error) {
        throw error;
      }
    }

    const tokenPayload: ITokenPayload = {
      userId: user.id,
      state,
    };

    const accessToken = JwtToken.generateAccessToken(tokenPayload);

    return { accessToken };
  }
}
