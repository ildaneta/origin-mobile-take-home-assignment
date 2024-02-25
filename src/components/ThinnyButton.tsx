import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import Text from './Text';
import { View } from 'tamagui';
import { ActivityIndicator } from 'react-native';

interface IThinnyButton extends RectButtonProps {
  hasBackground: boolean;
  label: string;
  isLoading?: boolean;
}

const ThinnyButton = ({
  hasBackground,
  label,
  isLoading,
  ...rest
}: IThinnyButton): JSX.Element => {
  return (
    <RectButton
      style={{
        borderRadius: 12,
        backgroundColor: hasBackground ? '#333' : 'transparent',
      }}
      rippleColor={hasBackground ? '#444' : '#efecec'}
      activeOpacity={hasBackground ? 0.8 : 0.1}
      {...rest}
    >
      <View
        borderWidth={hasBackground ? 0 : 1}
        borderRadius={12}
        paddingVertical={6}
        paddingHorizontal={12}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        {isLoading && (
          <ActivityIndicator
            size={'small'}
            color="#111"
            style={{ marginRight: 4 }}
          />
        )}

        <Text
          color={hasBackground ? '$white' : '$primary600'}
          fontSize={'$3'}
          alignSelf="center"
          lineHeight={22}
        >
          {label}
        </Text>
      </View>
    </RectButton>
  );
};

export default ThinnyButton;
