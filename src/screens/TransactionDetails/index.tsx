import React from 'react';
import { View } from 'tamagui';

import Container from '../../components/Container';
import Text from '../../components/Text';
import TransactionDetailsItem from './components/TransactionDetailsItem';
import HeaderBack from '../../components/HeaderBack';
import Upload from '../../components/Upload';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

const TransactionDetails = (): JSX.Element => {
  const {
    params: { Date, Vendor, Amount, Type, Category, Lat, Lon },
  } = useRoute<RouteProp<StackRoutes, 'transactionDetails'>>();

  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'transactionDetails'>>();

  return (
    <Container>
      <>
        <View marginTop={20} marginBottom={30}>
          <HeaderBack onPress={goBack} />
        </View>

        <TransactionDetailsItem
          date={Date}
          vendor={Vendor}
          amount={Amount}
          type={Type}
          category={Category}
        />

        <Text
          marginTop={39}
          marginBottom={12}
          fontSize={'$3'}
          color="$primary300"
        >
          Attach receipt
        </Text>

        <Upload
          allowedTypes="JPG, JPEG, PNG"
          onPress={() => {}}
          hasError={false}
          borderType="dashed"
        />

        <Text
          marginTop={39}
          marginBottom={12}
          fontSize={'$3'}
          color="$primary300"
        >
          Location
        </Text>
      </>
    </Container>
  );
};

export default TransactionDetails;
