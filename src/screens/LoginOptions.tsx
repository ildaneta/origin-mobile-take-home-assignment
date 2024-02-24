import React from 'react';
import { View } from 'tamagui';

import Container from '../components/Container';
import Text from '../components/Text';
import SolidButton from '../components/SolidButton';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../routes/stack.routes';

const LoginOptions = (): JSX.Element => {
  const { navigate } =
    useNavigation<NavigationProp<StackRoutes, 'loginOptions'>>();

  return (
    <Container>
      <>
        <Text>Login options</Text>

        <SolidButton label="SignIn" onPress={() => navigate('signIn')} />

        <View marginTop={12} />

        <SolidButton label="SignUp" onPress={() => navigate('signUp')} />
      </>
    </Container>
  );
};

export default LoginOptions;
