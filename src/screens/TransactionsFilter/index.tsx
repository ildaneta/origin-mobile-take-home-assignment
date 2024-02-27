import React, { useState } from 'react';
import { View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Container from '../../components/Container';
import Text from '../../components/Text';
import HeaderBack from '../../components/HeaderBack';
import Select from './components/Select';
import Selector from './components/Selector';
import ThinnyButton from '../../components/ThinnyButton';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

import { useTransactionFilter } from '../../stores/transactionFilter';

const TransactionsFilter = (): JSX.Element => {
  const insets = useSafeAreaInsets();
  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'transactionsFilter'>>();

  const {
    value: valueFilter,
    orderBy: orderByFilter,
    setValueTransactionFilter,
    setOrderByTransactionFilter,
    resetFilter,
  } = useTransactionFilter();

  const [orderBy, setOrderBy] = useState(orderByFilter);
  const [isOrderBySelectOpened, setIsOrderBySelectOpened] = useState(false);

  const [value, setValue] = useState(valueFilter);
  const [isValueSelectOpened, setIsValueSelectOpened] = useState(false);

  const orderByValues = [
    { name: 'Type', id: 1 },
    { name: 'Category', id: 2 },
  ];

  const categoryValues = [
    { name: 'Shopping', id: 3 },
    { name: 'Entertainment', id: 4 },
    { name: 'Drinks and dinning', id: 5 },
  ];

  const typeValues = [
    { name: 'Invoice', id: 6 },
    { name: 'Payment', id: 7 },
    { name: 'Deposit', id: 8 },
    { name: 'Withdrawal', id: 9 },
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

    setOrderByTransactionFilter({ orderBy: selectedItem });
    setValueTransactionFilter({ value: '' });
  };

  const handleValueChange = (selectedItem: string) => {
    setValue(selectedItem);
    setIsValueSelectOpened(false);

    setValueTransactionFilter({ value: selectedItem });
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

        <View marginTop={30} />

        <ThinnyButton
          label="Reset filters"
          onPress={() => {
            resetFilter();
            setValue('');
            setOrderBy('');
          }}
          hasBackground={false}
        />
      </Container>
    </>
  );
};

export default TransactionsFilter;
