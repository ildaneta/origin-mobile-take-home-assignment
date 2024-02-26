import React from 'react';
import { View, Text, Button } from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

interface ISelect {
  placeholder: string;
  filter: string;
  isOpened: boolean;
  onPress: () => void;
}

const Select = ({
  placeholder,
  filter,
  isOpened,
  onPress,
}: ISelect): JSX.Element => {
  return (
    <Button
      unstyled
      flexDirection="row"
      borderWidth={1}
      justifyContent="space-between"
      paddingHorizontal={16}
      paddingVertical={12}
      borderRadius={16}
      onPress={onPress}
      borderColor={'$primary200'}
    >
      <View>
        <Text color={'$primary600'}>{filter ? filter : placeholder}</Text>
      </View>

      {isOpened ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
};

export default Select;
