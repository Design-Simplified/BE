export interface IMembershipTypeDto {
  id: string;
  name: string;
  price: number;
  durationInDay: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllMembershipTypesResponse {
  membershipTypes: IMembershipTypeDto[];
}
