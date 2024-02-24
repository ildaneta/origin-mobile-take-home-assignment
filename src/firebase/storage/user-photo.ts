import storage from '@react-native-firebase/storage';
import { useUserStore } from '../../stores/user';

export const getUserPhotoURLST = async () => {
  const {
    userData: { uid, filename },
  } = useUserStore.getState();

  try {
    const imageRef = storage().ref(`user-photo/${uid}/${filename}`);
    const imageUrl = await imageRef.getDownloadURL();

    return imageUrl ?? 'https://';
  } catch (error) {
    console.error('Error getting user photo', error);
  }
};
