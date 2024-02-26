import React, { useState } from 'react';
import { View } from 'tamagui';
import { SafeAreaView } from 'react-native';

import Container from '../components/Container';
import HeaderBack from '../components/HeaderBack';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';
import SolidButton from '../components/SolidButton';
import Text from '../components/Text';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Eye, EyeOff } from '@tamagui/lucide-icons';

import { ISignIn } from '../types/auth';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../routes/stack.routes';

import { SCREEN_HEIGHT } from '../utils/device';

import { signIn } from '../firebase/auth';
import firebase from '@react-native-firebase/app';

import { useUserStore } from '../stores/user';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const schema = Yup.object().shape({
  email: Yup.string().required('email is required').email().trim(),
  password: Yup.string().required('password is required').min(8).max(8).trim(),
});

const SignIn = (): JSX.Element => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [
    isSecureTextEntryPasswordEnabled,
    setIsSecureTextEntryPasswordEnabled,
  ] = useState(true);

  const { goBack, navigate } =
    useNavigation<NavigationProp<StackRoutes, 'signIn'>>();
  const insets = useSafeAreaInsets();

  const { setCurrentScreenName, setIsUserLogged, setUserData } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver<ISignIn>(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: ISignIn) => {
    setIsLoading(true);
    try {
      await signIn(email, password).then(() => {
        const user = firebase.auth().currentUser;

        if (user) {
          setUserData({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photoUrl: user.photoURL,
          });
        }

        setCurrentScreenName({ currentScreenName: 'home' });
        setIsUserLogged({ isLogged: true });
      });
    } catch (error: any) {
      console.error(error);

      if (error.code === 'auth/invalid-credential') {
        setError('email', {
          message:
            'the supplied auth credential is incorrect, malformed or has expired',
        });

        setError('password', {
          message:
            'the supplied auth credential is incorrect, malformed or has expired',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Footer = () => (
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      bottom={20}
      width={'100%'}
    >
      <Text
        marginRight={3}
        fontSize={'$3'}
        color="$primary300"
        fontWeight={'500'}
      >
        Not a member
      </Text>
      <Text
        onPress={() => navigate('signUp')}
        marginLeft={3}
        textDecorationLine="underline"
        color={'$primary700'}
        fontWeight={'500'}
        fontSize={'$3'}
      >
        Register now
      </Text>
    </View>
  );

  const ActionButton = () => (
    <>
      <View marginTop={50} />

      <SolidButton
        label="SignIn"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <View marginBottom={20} />
    </>
  );

  const Header = () => (
    <View
      paddingHorizontal={10}
      paddingTop={16 + insets.top}
      backgroundColor={'$white'}
    >
      <HeaderBack onPress={() => goBack()} />
    </View>
  );

  return (
    <>
      <Header />

      <Container>
        <View height={SCREEN_HEIGHT - 130}>
          <Text
            alignSelf="center"
            color="$primary700"
            fontSize={'$5'}
            fontWeight={'500'}
          >
            Welcome back
          </Text>

          <View marginTop={40} />

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

          <ActionButton />

          <Footer />
        </View>
      </Container>
    </>
  );
};

export default SignIn;
