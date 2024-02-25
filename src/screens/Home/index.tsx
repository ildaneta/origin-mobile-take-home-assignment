import React, { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

import { Button, Image, View } from 'tamagui';
import { CircleEllipsis } from '@tamagui/lucide-icons';

import Container from '../../components/Container';
import Text from '../../components/Text';
import TransactionItem from './components/TransactionItem';

import { useUserStore } from '../../stores/user';

import { OriginAPI } from '../../services/origin';

import { useFocusEffect } from '@react-navigation/native';

import { IGetTransactionsListResponse } from '../../types/transaction';

import { SCREEN_HEIGHT } from '../../utils/device';

import { FlashList } from '@shopify/flash-list';

const Home = (): JSX.Element => {
  let pageSize = 200;

  const [transactionsList, setTransactionsList] =
    useState<IGetTransactionsListResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    userData: { photoUrl, name },
  } = useUserStore();

  const getTransactions = async () => {
    setIsRefreshing(true);

    try {
      const { data: transactionsListResponse } =
        await OriginAPI.getTransactionsList({
          pageNumber: 1,
          pageSize,
        });

      if (transactionsListResponse) {
        setTransactionsList(transactionsListResponse);
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

          if (transactionsListResponse) {
            setTransactionsList((prevList) => ({
              ...prevList,
              ...transactionsListResponse,
              Transactions: [
                ...(prevList?.Transactions ?? []),
                ...(transactionsListResponse.Transactions ?? []),
              ],
            }));

            setCurrentPage(currentPage + 1);
          }
        }
      }
    } catch (error) {
      console.error('Error getting transactions list', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

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

      <Button unstyled pressStyle={{ opacity: 0.7 }}>
        <CircleEllipsis color="$primary600" size={22} />
      </Button>
    </View>
  );

  return (
    <Container hasScroll={false}>
      <>
        <Header />

        <TransactionsListHeader />

        <View flexGrow={1} height={SCREEN_HEIGHT - 200}>
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
                onPress={() => {}}
              />
            )}
            ListFooterComponent={
              isLoading ? (
                <ActivityIndicator size="large" color="#111" />
              ) : (
                <></>
              )
            }
          />
        </View>
      </>
    </Container>
  );
};

export default Home;
