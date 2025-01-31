export interface ILoginWithEmailRequest {
  email: string;
  state: string;
}

export interface ILoginResponse {
  accessToken: string;
}
