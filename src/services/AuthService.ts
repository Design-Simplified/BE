import { db as database } from '../configs/database';
import { AuthProvider } from '../constants';
import type { IAuthDTO, ITokenPayload } from '../dtos/AuthDto';
import type { IRegisterResponse } from '../dtos/UserDto';
import { UserRepository, AuthMethodRepository } from '../repositories';
import { JwtToken } from '../utils/jwt-utils';

export class AuthService {
  static async loginWithGoogle(request: IAuthDTO): Promise<IRegisterResponse> {
    let googleMethod = await AuthMethodRepository.findByProviderId(
      request.user.googleId,
    );

    if (!googleMethod) {
      const user = await UserRepository.findByEmail(request.user.email);

      if (user) {
        googleMethod = await AuthMethodRepository.create(
          user.id,
          AuthProvider.GOOGLE,
          request.user.googleId,
        );

        const tokenPayload: ITokenPayload = {
          userId: user.id,
          state: request.user.state,
        };

        const accessToken = JwtToken.generateAccessToken(tokenPayload);

        return {
          accessToken: accessToken,
        };
      }

      const db = database;

      try {
        const createUserTx = await db.$transaction(async tx => {
          const newUser = await UserRepository.create(
            request.user.username,
            request.user.email,
            tx,
          );

          googleMethod = await AuthMethodRepository.create(
            newUser.id,
            AuthProvider.GOOGLE,
            request.user.googleId,
            tx,
          );

          return newUser;
        });

        const tokenPayload: ITokenPayload = {
          userId: createUserTx.id,
          state: request.user.state,
        };

        const accessToken = JwtToken.generateAccessToken(tokenPayload);

        return {
          accessToken: accessToken,
        };
      } catch (error) {
        throw error;
      }
    }

    const tokenPayload: ITokenPayload = {
      userId: googleMethod.userId,
      state: request.user.state,
    };

    const accessToken = JwtToken.generateAccessToken(tokenPayload);

    return {
      accessToken: accessToken,
    };
  }
}
