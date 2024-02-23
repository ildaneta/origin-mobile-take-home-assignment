export type UserState = {
  userData: IUser;
};

export interface IUserData {
  uid: string;
  email: string | null;
  name: string;
}

export interface IUser extends IUserData {
  isLogged: boolean;
}
