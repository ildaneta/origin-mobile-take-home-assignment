import React, { useCallback } from 'react';
import { Image, View } from 'tamagui';

import Container from '../../components/Container';
import Text from '../../components/Text';

import { useUserStore } from '../../stores/user';
import TransactionItem from './components/TransactionItem';

const Home = (): JSX.Element => {
  const {
    userData: { photoUrl, name },
  } = useUserStore();

  const Header = () => (
    <View marginTop={16} flexDirection="row" alignItems="center">
      <Image
        source={{ uri: photoUrl ?? 'https://', cache: 'force-cache' }}
        width={42}
        height={42}
        borderRadius={21}
        backgroundColor={'$gray100'}
      />

      <Text
        marginLeft={12}
        fontSize={'$5'}
        fontWeight={'500'}
        color={'$primary300'}
      >
        {name?.toUpperCase() ?? ''}
      </Text>
    </View>
  );

  const TransactionsList = () => (
    <View marginTop={50}>
      <Text
        fontSize={'$4'}
        color={'$primary700'}
        fontWeight={'600'}
        marginBottom={28}
      >
        Transactions
      </Text>
    </View>
  );

  return (
    <Container>
      <>
        <Header />

        <TransactionsList />

        <TransactionItem
          title="Vandervort, Parker and Barrows"
          category="drinks and dinning"
          type="payment"
          ammount={104.84}
          date="2024-01-25T13:29:18.5457245+00:00"
        />
      </>
    </Container>
  );
};

export default Home;
