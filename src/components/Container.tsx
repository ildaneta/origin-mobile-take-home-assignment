import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { View, ScrollView } from 'tamagui';

interface IContainer {
  hasScroll?: boolean;
  children: JSX.Element;
  hasPaddingHorizontal?: boolean;
}

const Container = ({
  hasScroll = true,
  children,
  hasPaddingHorizontal = true,
}: IContainer): JSX.Element => {
  return (
    <>
      {hasScroll ? (
        <ScrollView
          paddingHorizontal={hasPaddingHorizontal ? 20 : 0}
          showsVerticalScrollIndicator={false}
          backgroundColor={'$bg'}
        >
          <SafeAreaView>{children}</SafeAreaView>
        </ScrollView>
      ) : (
        <View
          paddingHorizontal={hasPaddingHorizontal ? 20 : 0}
          backgroundColor={'$bg'}
        >
          <SafeAreaView>{children}</SafeAreaView>
        </View>
      )}
    </>
  );
};

export default Container;
