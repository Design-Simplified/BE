import type { IGetAllMembershipTypesResponse } from '../dtos/MembershipTypeDto';
import { MembershipTypeRepository } from '../repositories';

export class MembershipTypeService {
  static async getAllMembershipTypes(): Promise<IGetAllMembershipTypesResponse> {
    const membershipTypes = await MembershipTypeRepository.findAll();

    return { membershipTypes };
  }
}
