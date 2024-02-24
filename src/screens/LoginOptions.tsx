import React from 'react';
import { View } from 'tamagui';

import Container from '../components/Container';
import Text from '../components/Text';
import ThinnyButton from '../components/ThinnyButton';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../routes/stack.routes';

import FinancialIllustration from '../assets/illustrations/financial.svg';

const LoginOptions = (): JSX.Element => {
  const { navigate } =
    useNavigation<NavigationProp<StackRoutes, 'loginOptions'>>();

  return (
    <>
      <Container hasScroll={false}>
        <View justifyContent="center" alignItems="center">
          <Text
            color="$primary700"
            fontSize={'$6'}
            fontWeight={'500'}
            alignSelf="center"
            marginTop={30}
            marginBottom={40}
          >
            Origin Financial
          </Text>

          <FinancialIllustration />

          <Text
            color="$primary700"
            fontSize={'$5'}
            fontWeight={'500'}
            alignSelf="center"
            marginTop={26}
          >
            Master your spending
          </Text>

          <Text
            color="$primary300"
            fontSize={'$3'}
            fontWeight={'500'}
            alignSelf="center"
            marginTop={'$1.5'}
            textAlign="center"
          >
            Origin helps you track expenses in real time, create monthly
            budgets, and manage your subscriptions
          </Text>
        </View>
      </Container>

      <View
        flexDirection="row"
        width={'100%'}
        justifyContent="space-between"
        marginBottom={40}
        paddingHorizontal={20}
        bottom={0}
        position="absolute"
      >
        <View width={'48%'}>
          <ThinnyButton
            label={'Sign up'}
            hasBackground
            onPress={() => navigate('signUp')}
          />
        </View>
        <View width={'48%'}>
          <ThinnyButton
            label={'Sign in'}
            hasBackground={false}
            onPress={() => navigate('signIn')}
          />
        </View>
      </View>
    </>
  );
};

export default LoginOptions;
