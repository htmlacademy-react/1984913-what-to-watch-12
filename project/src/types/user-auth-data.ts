export type UserAuthStatus = string;

export type Token = string;

export type AuthData = {
  email: string;
  password:string;
}

export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
}
