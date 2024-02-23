import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { IUserData } from '../../types/user';

export const setUserDataFS = async ({ uid, email, name }: IUserData) => {
  await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ email, name, uid });
};
