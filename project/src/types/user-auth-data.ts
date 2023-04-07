export type UserAuthStatus = string;

export type Token = string;

export type AuthData = {
  login: string;
  password:string;
}

export type UserData = {
  id:number;
  email: string;
  token:string;
}
