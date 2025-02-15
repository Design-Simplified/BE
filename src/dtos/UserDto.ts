export interface ILoginWithEmailRequest {
  email: string;
  state: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IGetUserRequest {
  userId: string;
  state: string;
  role: number;
}

export interface IGetUserResponse {
  userId: string;
  username: string;
  email: string;
  state: string;
  role: number;
  photoProfile?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUserRequest {
  userId: string;
  username: string;
}

export interface IUpdateUserResponse {
  userId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdatePhotoProfileRequest {
  userId: string;
  photoProfile: string;
}

export interface IDeleteUserRequest {
  userId: string;
}
