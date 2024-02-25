import React from 'react';
import { View } from 'tamagui';

import Text from '../../../components/Text';

import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

import DrinksAndDinningSVG from '../../../assets/icons/drinks_and_dinning-big.svg';
import EntertainmentSVG from '../../../assets/icons/entertainment-big.svg';
import ShoppingSVG from '../../../assets/icons/shopping-big.svg';

import {
  TransactionCategory,
  TransactionType,
} from '../../../types/transaction';

interface ITransactionDetailsItem {
  category: TransactionCategory;
  amount: number;
  date: Date;
  vendor: string;
  type: TransactionType;
}

interface ITransactionDetailsIcon {
  icon: JSX.Element;
}

interface ITransactionDetailsVendor {
  color: string;
  signal: string;
}

const TransactionDetailsItem = ({
  category,
  amount,
  date,
  vendor,
  type,
}: ITransactionDetailsItem): JSX.Element => {
  const transactionCategoryMapping: Record<
    TransactionCategory,
    ITransactionDetailsIcon
  > = {
    [TransactionCategory.shopping]: {
      icon: <ShoppingSVG />,
    },
    [TransactionCategory.drinks_and_dinning]: {
      icon: <DrinksAndDinningSVG />,
    },
    [TransactionCategory.entertainment]: {
      icon: <EntertainmentSVG />,
    },
  };

  const transactionTypeMapping: Record<
    TransactionType,
    ITransactionDetailsVendor
  > = {
    [TransactionType.deposit]: {
      color: '$green',
      signal: '',
    },
    [TransactionType.invoice]: {
      color: '$primary700',
      signal: '',
    },
    [TransactionType.payment]: {
      color: '$red',
      signal: '-',
    },
    [TransactionType.withdrawal]: {
      color: '$red',
      signal: '-',
    },
  };

  return (
    <>
      <View
        borderWidth={1}
        borderRadius={12}
        borderColor={'$gray200'}
        padding={16}
        justifyContent="center"
        alignItems="center"
      >
        <View
          borderRadius={4}
          borderColor={'$gray200'}
          borderWidth={1}
          justifyContent="center"
          alignItems="center"
          padding={4}
        >
          {transactionCategoryMapping[category].icon}
        </View>

        <Text color="$primary700" fontSize={'$3'} marginTop={12}>
          {vendor}
        </Text>

        <Text fontSize={'$4'} color={transactionTypeMapping[type].color}>
          {`${transactionTypeMapping[type].signal} ${formatCurrency(amount)}`}
        </Text>
      </View>

      <Text
        alignSelf="center"
        marginTop={8}
        fontSize={'$2'}
        color="$primary300"
      >
        {formatDate(date)}
      </Text>
    </>
  );
};

export default TransactionDetailsItem;
