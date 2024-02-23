import auth from '@react-native-firebase/auth';

import { IResetPassword, ISignUp } from '../../types/auth';

export const signUp = ({
  email,
  password,
}: Pick<ISignUp, 'email' | 'password'>) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return auth().signOut();
};

export const resetPassword = async ({ email }: IResetPassword) => {
  return auth().sendPasswordResetEmail(email);
};
