import { StatusCodes } from 'http-status-codes';

import type { IDeleteUserRequest } from '../dtos/UserDto';
import { ResponseError } from '../error/ResponseError';
import { UserRepository } from '../repositories';

export class UserService {
  static async deleteUser(request: IDeleteUserRequest): Promise<void> {
    const user = await UserRepository.findById(request.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    await UserRepository.delete(user.id);
  }
}
