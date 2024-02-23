import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Text from './Text';

interface ISolidButton {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
}

const SolidButton = ({
  label,
  onPress,
  isLoading = false,
}: ISolidButton): JSX.Element => {
  return (
    <RectButton
      onPress={onPress}
      style={{
        backgroundColor: isLoading ? '#666' : '#333',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      enabled={!isLoading}
    >
      {isLoading && <ActivityIndicator size={'small'} color="white" />}

      <Text
        alignSelf="center"
        fontSize={'$4'}
        color="$white"
        marginLeft={8}
        lineHeight={26}
      >
        {label}
      </Text>
    </RectButton>
  );
};

export default SolidButton;
