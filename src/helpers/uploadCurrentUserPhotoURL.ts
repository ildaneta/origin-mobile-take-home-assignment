import firebase from '@react-native-firebase/app';
import { getUserPhotoURLST } from '../firebase/storage/user-photo';

export const uploadCurrentUserPhotoURL = async () => {
  const photoURL = await getUserPhotoURLST();

  if (photoURL) {
    await firebase.auth().currentUser?.updateProfile({
      photoURL,
    });
  }
};
