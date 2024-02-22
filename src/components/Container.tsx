import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View, ScrollView } from 'tamagui';

import { ANDROID_STATUS_BAR_HEIGHT, IS_IOS } from '../utils/device';

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
  const insets = useSafeAreaInsets();

  return (
    <>
      <View marginTop={IS_IOS ? insets.top : ANDROID_STATUS_BAR_HEIGHT} />

      {hasScroll ? (
        <ScrollView
          marginHorizontal={hasPaddingHorizontal ? 20 : 0}
          marginTop={12}
        >
          {children}
        </ScrollView>
      ) : (
        <View marginHorizontal={hasPaddingHorizontal ? 20 : 0} marginTop={12}>
          {children}
        </View>
      )}
    </>
  );
};

export default Container;
