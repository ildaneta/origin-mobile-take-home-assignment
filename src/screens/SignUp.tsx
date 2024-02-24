import React, { useState } from 'react';
import { Image, View } from 'tamagui';
import { Alert, SafeAreaView } from 'react-native';

import Container from '../components/Container';
import Input from '../components/Input';
import HeaderBack from '../components/HeaderBack';
import Text from '../components/Text';
import Upload from '../components/Upload';
import SolidButton from '../components/SolidButton';
import ErrorMessage from '../components/ErrorMessage';

import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Eye, EyeOff } from '@tamagui/lucide-icons';

import { ISignUp } from '../types/auth';

import firebase from '@react-native-firebase/app';
import { setUserDataFS } from '../firebase/firestore/users';
import { signUp } from '../firebase/auth';

import { useUserStore } from '../stores/user';
import storage from '@react-native-firebase/storage';

import { StackRoutes } from '../routes/stack.routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { RectButton } from 'react-native-gesture-handler';

import { IS_IOS } from '../utils/device';

import { uploadCurrentUserPhotoURL } from '../helpers/uploadCurrentUserPhotoURL';

const schema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string().required('email is required').email().trim(),
  password: Yup.string().required('password is required').min(8).max(8).trim(),
  photo: Yup.string().required('photo is required'),
});

const SignUp = (): JSX.Element => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [
    isSecureTextEntryPasswordEnabled,
    setIsSecureTextEntryPasswordEnabled,
  ] = useState(true);
  const [image, setImage] = useState('');

  const { setUserData, setIsUserLogged, setCurrentScreenName, setFileName } =
    useUserStore();
  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'loginOptions'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver<ISignUp>(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      photo: '',
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];

      setImage(uri);
      setValue('photo', uri);
      setError('photo', { message: '' });
    }
  };

  const uploadImage = async (uid: string) => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = IS_IOS ? image.replace('file://', '') : image;

    setFileName({ filename });

    await storage().ref(`user-photo/${uid}/${filename}`).putFile(uploadUri);
  };

  const onSubmit = async ({ email, password, name }: ISignUp) => {
    setIsLoading(true);

    try {
      await signUp({ email, password }).then(async () => {
        const user = firebase.auth().currentUser;

        await firebase
          .auth()
          .currentUser?.updateProfile({
            displayName: name,
          })
          .catch((error) =>
            console.error('Error updating user profile: ', error)
          );

        if (user) {
          setUserData({
            name,
            email: user.email,
            uid: user.uid,
            photoUrl: image,
          });

          await setUserDataFS({ email: user.email, uid: user.uid, name })
            .then(() => {
              uploadImage(user.uid)
                .then(() => {
                  setIsUserLogged({ isLogged: true });
                  setCurrentScreenName({ currentScreenName: 'home' });

                  uploadCurrentUserPhotoURL();

                  setIsLoading(false);
                })
                .catch((error) =>
                  console.error('Error uploading user selfie: ', error)
                )
                .finally(() => {
                  setIsLoading(false);
                });
            })
            .catch((err) =>
              console.error('Error setting user data within users: ', err)
            );
        }
      });
    } catch (error: any) {
      console.error('Error creating user account: ', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    }
  };

  const Header = () => (
    <SafeAreaView>
      <View paddingHorizontal={10} marginTop={16}>
        <HeaderBack onPress={() => goBack()} />
      </View>
    </SafeAreaView>
  );

  const ActionButton = () => (
    <>
      <View marginTop={!!image ? 0 : 36} />

      <SolidButton
        label="Create account"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <View marginBottom={100} />
    </>
  );

  const SelectedImage = () => (
    <View justifyContent="center" alignItems="center" marginBottom={30}>
      <Text
        fontSize={'$3'}
        marginBottom={10}
        color={'$primary200'}
        alignSelf="flex-start"
      >
        Selected selfie
      </Text>

      <Image
        source={{ uri: image }}
        width={90}
        height={90}
        borderRadius={45}
        marginBottom={10}
      />

      <RectButton
        onPress={pickImage}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#666',
          width: '60%',
          alignSelf: 'center',
          padding: 6,
          borderRadius: 12,
        }}
      >
        <Text fontSize={'$3'} lineHeight={22} marginRight={4} color="$white">
          Choose another image
        </Text>
      </RectButton>
    </View>
  );

  return (
    <>
      <Header />

      <Container>
        <>
          <Text alignSelf="center" color="$primary700" fontSize={'$4'}>
            Get started with Origin
          </Text>

          <Text alignSelf="center" color="$gray300" fontSize={'$3'}>
            Try Origin free
          </Text>

          <View marginTop={40} />

          <Input
            control={control}
            name="name"
            hasError={!!errors.name}
            label="Name"
            isFocused={isNameFocused}
            onBlur={() => setIsNameFocused(false)}
            onFocus={() => setIsNameFocused(true)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {!!errors.name && <ErrorMessage message={errors?.name?.message} />}

          <View marginTop={12} />

          <Input
            control={control}
            name="email"
            hasError={!!errors.email}
            label="Email"
            isFocused={isEmailFocused}
            onBlur={() => setIsEmailFocused(false)}
            onFocus={() => setIsEmailFocused(true)}
          />

          {!!errors.email && <ErrorMessage message={errors?.email?.message} />}

          <View marginTop={12} />

          <Input
            control={control}
            name="password"
            hasError={!!errors.password}
            label="Password"
            isFocused={isPasswordFocused}
            onBlur={() => setIsPasswordFocused(false)}
            onFocus={() => setIsPasswordFocused(true)}
            iconButton={
              isSecureTextEntryPasswordEnabled ? (
                <EyeOff color={'$primary300'} />
              ) : (
                <Eye color={'$primary300'} />
              )
            }
            iconButtonPress={() =>
              setIsSecureTextEntryPasswordEnabled(
                !isSecureTextEntryPasswordEnabled
              )
            }
            secureTextEntry={isSecureTextEntryPasswordEnabled}
          />

          {!!errors.password && (
            <ErrorMessage message={errors?.password?.message} />
          )}

          <View marginTop={12} />

          {!!image ? (
            <SelectedImage />
          ) : (
            <Controller
              name="photo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Upload
                  hasError={!!errors?.photo}
                  onPress={pickImage}
                  allowedTypes="JPG, PNG, JPEG"
                  label="Upload your selfie"
                />
              )}
            />
          )}

          {!!errors.password && (
            <ErrorMessage message={errors?.photo?.message} />
          )}

          <ActionButton />
        </>
      </Container>
    </>
  );
};

export default SignUp;
