import React from 'react';
import { SafeAreaView } from 'react-native';

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
        <SafeAreaView>
          <ScrollView
            paddingHorizontal={hasPaddingHorizontal ? 20 : 0}
            showsVerticalScrollIndicator={false}
            backgroundColor={'$bg'}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <View
            paddingHorizontal={hasPaddingHorizontal ? 20 : 0}
            backgroundColor={'$bg'}
          >
            {children}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Container;
