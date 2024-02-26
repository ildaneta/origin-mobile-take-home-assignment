import React, { useState } from 'react';
import { View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Container from '../../components/Container';
import Text from '../../components/Text';
import HeaderBack from '../../components/HeaderBack';
import Select from './components/Select';
import Selector from './components/Selector';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

const TransactionsFilter = (): JSX.Element => {
  const insets = useSafeAreaInsets();
  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'transactionsFilter'>>();

  const [orderBy, setOrderBy] = useState('');
  const [isOrderBySelectOpened, setIsOrderBySelectOpened] = useState(false);

  const [value, setValue] = useState('');
  const [isValueSelectOpened, setIsValueSelectOpened] = useState(false);

  const orderByValues = [
    { name: 'Type', id: 1 },
    { name: 'Category', id: 2 },
  ];

  const categoryValues = [
    { name: 'Shopping', id: 1 },
    { name: 'Entertainment', id: 2 },
    { name: 'Drinks and dinning', id: 3 },
  ];

  const typeValues = [
    { name: 'Invoice', id: 1 },
    { name: 'Payment', id: 2 },
    { name: 'Deposit', id: 3 },
    { name: 'Withdrawal', id: 4 },
  ];

  const Header = () => (
    <View
      paddingHorizontal={10}
      paddingTop={16 + insets.top}
      backgroundColor={'$white'}
      paddingBottom={20}
    >
      <HeaderBack onPress={goBack} />
    </View>
  );

  const handleOrderByChange = (selectedItem: string) => {
    setOrderBy(selectedItem);
    setIsOrderBySelectOpened(false);
    setValue('');
  };

  const handleValueChange = (selectedItem: string) => {
    setValue(selectedItem);
    setIsValueSelectOpened(false);
  };

  const OrderBySelect = () => (
    <>
      <Text
        marginBottom={10}
        fontSize={'$3'}
        color="$primary600"
        fontWeight={'500'}
      >
        Order By
      </Text>

      <Select
        onPress={() => setIsOrderBySelectOpened(!isOrderBySelectOpened)}
        placeholder="Select a way to order"
        filter={orderBy}
        isOpened={isOrderBySelectOpened}
      />

      {isOrderBySelectOpened && (
        <Selector
          onPress={handleOrderByChange}
          filter={orderBy}
          options={orderByValues}
        />
      )}
    </>
  );

  const ValueSelect = () => (
    <>
      <Text
        marginBottom={10}
        fontSize={'$3'}
        color="$primary600"
        fontWeight={'500'}
      >
        Value
      </Text>

      <Select
        onPress={() => setIsValueSelectOpened(!isValueSelectOpened)}
        placeholder={`Select a ${orderBy.toLowerCase()}`}
        filter={value}
        isOpened={isValueSelectOpened}
      />

      {isValueSelectOpened && (
        <Selector
          onPress={handleValueChange}
          filter={value}
          options={orderBy === 'Type' ? typeValues : categoryValues}
        />
      )}
    </>
  );

  return (
    <>
      <Header />

      <Container>
        <OrderBySelect />

        {!!orderBy && (
          <>
            <View marginTop={20} />

            <ValueSelect />
          </>
        )}
      </Container>
    </>
  );
};

export default TransactionsFilter;
