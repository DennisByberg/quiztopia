interface ISignUpApiResponse {
  success: boolean;
  message?: string;
}

interface ILoginApiResponse {
  success: boolean;
  message?: string;
  token?: string;
}

interface UserState {
  loggedInUser: string;
  loggedInToken: string;
}
