import { db as databse } from '../configs/database';
import { AuthProvider } from '../constants';
import type { IAuthDTO, ITokenPayload } from '../dtos/AuthDto';
import type { IRegisterResponse } from '../dtos/UserDto';
import { UserRepository, AuthMethodRepository } from '../repositories';
import { JwtToken } from '../utils/jwt-utils';

export class AuthService {
  static async loginWithGoogle(request: IAuthDTO): Promise<IRegisterResponse> {
    const roleId = request.user.role;

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
        };

        const accessToken = JwtToken.generateAccessToken(tokenPayload);

        return {
          accessToken: accessToken,
        };
      }

      const db = databse;

      try {
        const createUserTx = await db.$transaction(async tx => {
          const newUser = await UserRepository.create(
            request.user.username,
            roleId,
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
    };

    const accessToken = JwtToken.generateAccessToken(tokenPayload);

    return {
      accessToken: accessToken,
    };
  }
}
