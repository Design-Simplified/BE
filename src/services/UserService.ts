import { StatusCodes } from 'http-status-codes';

import type {
  IGetUserRequest,
  IGetUserResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
  IDeleteUserRequest,
} from '../dtos/UserDto';
import { ResponseError } from '../error/ResponseError';
import { UserRepository } from '../repositories';
import { Validator } from '../utils/validator';
import { UserValidation } from '../validations';

export class UserService {
  static async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
    const validData = Validator.validate(UserValidation.GET, request);

    const user = await UserRepository.findById(validData.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      state: validData.state,
      role: validData.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async updateUser(
    request: IUpdateUserRequest,
  ): Promise<IUpdateUserResponse> {
    const validData = Validator.validate(UserValidation.UPDATE, request);

    const user = await UserRepository.findById(validData.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const updatedUser = await UserRepository.update(user.id, {
      username: validData.username,
    });

    return {
      userId: updatedUser.id,
      username: updatedUser.username,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }

  static async deleteUser(request: IDeleteUserRequest): Promise<void> {
    const user = await UserRepository.findById(request.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    await UserRepository.delete(user.id);
  }
}
