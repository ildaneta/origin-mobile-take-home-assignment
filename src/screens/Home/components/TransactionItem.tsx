import React from 'react';
import { View } from 'tamagui';

import Text from '../../../components/Text';

import {
  TransactionCategory,
  TransactionType,
} from '../../../types/transaction';

import DrinksAndDinningSVG from '../../../assets/icons/drinks_and_dinning.svg';
import EntertainmentSVG from '../../../assets/icons/entertainment.svg';
import ShoppingSVG from '../../../assets/icons/shopping.svg';

import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';

interface ITransactionItem {
  title: string;
  date: string;
  category: 'shopping' | 'entertainment' | 'drinks and dinning';
  type: 'invoice' | 'deposit' | 'payment' | 'withdraw';
  ammount: number;
}

interface ITransactionsCategoryProps {
  category: string;
  icon: JSX.Element;
}

interface ITransactionTypeProps {
  type: string;
  color: string;
  signal: string;
}

const TransactionItem = ({
  title,
  date,
  category,
  type,
  ammount,
}: ITransactionItem): JSX.Element => {
  const transactionsCategoryMapping: Record<
    TransactionCategory,
    ITransactionsCategoryProps
  > = {
    [TransactionCategory.shopping]: {
      category: 'Shopping',
      icon: <ShoppingSVG />,
    },
    [TransactionCategory.drinks_and_dinning]: {
      category: 'Drinks and dinning',
      icon: <DrinksAndDinningSVG />,
    },
    [TransactionCategory.entertainment]: {
      category: 'Entertainment',
      icon: <EntertainmentSVG />,
    },
  };

  const transactionsTypeMapping: Record<
    TransactionType,
    ITransactionTypeProps
  > = {
    [TransactionType.deposit]: {
      type: 'Deposit',
      color: '$green',
      signal: '',
    },
    [TransactionType.invoice]: {
      type: 'Invoice',
      color: '$primary700',
      signal: '',
    },
    [TransactionType.payment]: {
      type: 'Payment',
      color: '$red',
      signal: '-',
    },
    [TransactionType.withdraw]: {
      type: 'Payment',
      color: '$primary700',
      signal: '-',
    },
  };

  return (
    <View marginBottom={12}>
      <View flexDirection="row" alignItems="center">
        <View
          width={32}
          height={32}
          borderWidth={1}
          borderColor={'$primary300'}
          borderRadius={4}
          marginRight={8}
          alignItems="center"
          justifyContent="center"
        >
          {transactionsCategoryMapping[category].icon}
        </View>

        <Text fontSize={'$3'} width={'95%'} color="$primary300">
          {title.toUpperCase()}
        </Text>
      </View>

      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginTop={8}
      >
        <Text fontSize={'$2'} color="$primary300">
          {formatDate(date)}
        </Text>

        <Text fontSize={'$4'} color={transactionsTypeMapping[type].color}>
          {`${transactionsTypeMapping[type].signal} ${formatCurrency(ammount)}`}
        </Text>
      </View>

      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginTop={6}
      >
        <View
          backgroundColor={'$gray100'}
          paddingHorizontal={9}
          paddingVertical={4}
          borderRadius={20}
        >
          <Text fontSize={'$1'} color="$primary400">
            {transactionsCategoryMapping[category].category}
          </Text>
        </View>

        <Text fontSize={'$2'} color="$primary400">
          {transactionsTypeMapping[type].type}
        </Text>
      </View>
    </View>
  );
};

export default TransactionItem;
