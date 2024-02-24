import React, { useState } from 'react';
import { View } from 'tamagui';
import { Alert } from 'react-native';

import Container from '../components/Container';
import Input from '../components/Input';
import HeaderBack from '../components/HeaderBack';
import Text from '../components/Text';
import Upload from '../components/Upload';
import SolidButton from '../components/SolidButton';
import ErrorMessage from '../components/ErrorMessage';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Eye, EyeOff } from '@tamagui/lucide-icons';

import { ISignUp } from '../types/auth';

import firebase from '@react-native-firebase/app';
import { setUserDataFS } from '../firebase/firestore/users';
import { signUp } from '../firebase/auth';

import { useUserStore } from '../stores/user';

import { StackRoutes } from '../routes/stack.routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

const schema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string().required('email is required').email().trim(),
  password: Yup.string().required('password is required').min(8).max(8).trim(),
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

  const { setUserData, setIsUserLogged, setCurrentScreenName } = useUserStore();
  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'loginOptions'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<ISignUp>(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

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
          setUserData({ name, email: user.email, uid: user.uid });

          await setUserDataFS({ email: user.email, uid: user.uid, name })
            .then(() => {
              setIsUserLogged({ isLogged: true });
              setCurrentScreenName({ currentScreenName: 'home' });
            })
            .catch((err) =>
              console.log('Error setting user data within users: ', err)
            );
        }
      });
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    } finally {
      setIsLoading(false);
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
      <View marginTop={36} />

      <SolidButton
        label="Create account"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <View marginBottom={30} />
    </>
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

          <Upload
            hasError={false}
            onPress={() => {}}
            allowedTypes="JPG, PNG, JPEG"
            label="Upload your selfie"
          />

          <ActionButton />
        </>
      </Container>
    </>
  );
};

export default SignUp;
