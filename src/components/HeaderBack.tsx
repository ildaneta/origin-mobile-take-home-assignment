import React from 'react';
import { Button } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';

import { RectButton } from 'react-native-gesture-handler';

interface IHeaderBack {
  onPress: () => void;
}

const HeaderBack = ({ onPress }: IHeaderBack): JSX.Element => {
  return (
    <Button unstyled>
      <RectButton
        onPress={onPress}
        style={{
          width: 40,
          height: 40,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: -10,
        }}
      >
        <ArrowLeft width={'$5'} height={'$5'} color="$primary700" />
      </RectButton>
    </Button>
  );
};

export default HeaderBack;
