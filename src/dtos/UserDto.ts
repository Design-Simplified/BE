export interface ILoginWithEmail {
  email: string;
  state: string;
}

export interface ILoginResponse {
  accessToken: string;
}
