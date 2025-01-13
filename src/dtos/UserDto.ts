export interface IUser {
  email: string;
  username: string;
  roleId: number;
  profilePicture?: string;
}

export interface IRegisterResponse {
  accessToken: string;
}

export interface ILoginResponse {
  accessToken: string;
}
