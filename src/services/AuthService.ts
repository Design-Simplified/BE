import { db as database } from '../configs/database';
import { AuthProvider } from '../constants';
import type { IAuthDTO, ITokenPayload } from '../dtos/AuthDto';
import type { ILoginResponse } from '../dtos/UserDto';
import { UserRepository, AuthMethodRepository } from '../repositories';
import { JwtToken } from '../utils/jwt-utils';

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
        const newUser = await db.$transaction(async tx => {
          const createdUser = await UserRepository.create(
            request.user.username,
            userEmail || '',
            tx,
          );

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
}
