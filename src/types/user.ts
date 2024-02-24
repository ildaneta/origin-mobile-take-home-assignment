import { StackRoutes } from '../routes/stack.routes';

export type UserState = {
  userData: IUser;
  currentScreenName: keyof StackRoutes;
};

export interface IUserData {
  uid: string;
  email: string | null;
  name: string | null;
}

export interface IUser extends IUserData {
  isLogged: boolean;
}
