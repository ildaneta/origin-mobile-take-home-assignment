import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

import { Button, Image, View } from 'tamagui';
import { CircleEllipsis } from '@tamagui/lucide-icons';

import Container from '../../components/Container';
import Text from '../../components/Text';
import TransactionItem from './components/TransactionItem';

import { useUserStore } from '../../stores/user';
import { useTransactionFilter } from '../../stores/transactionFilter';

import { OriginAPI } from '../../services/origin';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

import { IGetTransactionsListResponse } from '../../types/transaction';

import { FlashList } from '@shopify/flash-list';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = (): JSX.Element => {
  let pageSize = 200;

  const [transactionsList, setTransactionsList] =
    useState<IGetTransactionsListResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const insets = useSafeAreaInsets();

  const {
    userData: { photoUrl, name },
  } = useUserStore();
  const { orderBy, value } = useTransactionFilter();

  const { navigate } = useNavigation<NavigationProp<StackRoutes, 'home'>>();

  const getTransactions = async () => {
    setIsRefreshing(true);

    try {
      const { data: transactionsListResponse } =
        await OriginAPI.getTransactionsList({
          pageNumber: 1,
          pageSize,
        });

      if (transactionsListResponse) {
        const filteredTransactions =
          transactionsListResponse.Transactions.filter((transaction) => {
            if (orderBy === 'Type' && !!value) {
              return transaction.Type === value.toLowerCase();
            }

            if (orderBy === 'Category' && !!value) {
              return transaction.Category === value.toLowerCase();
            }
          });

        if (!!orderBy && !!value) {
          setTransactionsList({
            ...transactionsListResponse,
            Transactions: [...filteredTransactions],
          });
        } else {
          setTransactionsList(transactionsListResponse);
        }

        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Error getting transactions list', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadMoreTransactions = async () => {
    setIsLoading(true);

    try {
      if (transactionsList) {
        if (currentPage < transactionsList.TotalPages) {
          const { data: transactionsListResponse } =
            await OriginAPI.getTransactionsList({
              pageNumber: currentPage,
              pageSize,
            });

          const filteredTransactions =
            transactionsListResponse.Transactions.filter((transaction) => {
              if (orderBy === 'Type' && !!value) {
                return transaction.Type === value.toLowerCase();
              }

              if (orderBy === 'Category' && !!value) {
                return transaction.Category === value.toLowerCase();
              }
            });

          if (!!orderBy && !!value) {
            setTransactionsList((prevList) => ({
              ...prevList,
              ...transactionsListResponse,
              Transactions: [
                ...(prevList?.Transactions ?? []),
                ...(filteredTransactions ?? []),
              ],
            }));
          } else {
            setTransactionsList((prevList) => ({
              ...prevList,
              ...transactionsListResponse,
              Transactions: [
                ...(prevList?.Transactions ?? []),
                ...(transactionsListResponse.Transactions ?? []),
              ],
            }));
          }
          setCurrentPage(currentPage + 1);
        }
      }
    } catch (error) {
      console.error('Error getting transactions list', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [orderBy, value]);

  const Header = () => (
    <View marginTop={16 + insets.top} flexDirection="row" alignItems="center">
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

  const TransactionsListHeader = () => (
    <View
      marginTop={30}
      marginBottom={20}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize={'$4'} color={'$primary700'} fontWeight={'600'}>
        Transactions
      </Text>

      <Button
        unstyled
        pressStyle={{ opacity: 0.7 }}
        onPress={() => navigate('transactionsFilter')}
      >
        <CircleEllipsis color="$primary600" size={22} />
      </Button>
    </View>
  );

  return (
    <Container hasScroll={false}>
      <Header />

      <TransactionsListHeader />

      <FlashList
        estimatedItemSize={transactionsList?.TotalRecords ?? 200}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ Id }) => String(Id)}
        data={transactionsList?.Transactions}
        ItemSeparatorComponent={() => (
          <View marginBottom={5} borderWidth={1} borderColor={'$gray100'} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getTransactions}
          />
        }
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.1}
        renderItem={({ item: transaction }) => (
          <TransactionItem
            vendor={transaction.Vendor}
            category={transaction.Category}
            type={transaction.Type}
            ammount={transaction.Amount}
            date={transaction.Date}
            onPress={() => navigate('transactionDetails', { ...transaction })}
          />
        )}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#111" /> : <></>
        }
      />

      <View paddingBottom={insets.bottom} />
    </Container>
  );
};

export default Home;
