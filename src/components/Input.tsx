import React from 'react';
import { View, Text, Input as InputTMG, InputProps } from 'tamagui';

import { Control, useController } from 'react-hook-form';

interface IInput extends InputProps {
  isFocused: boolean;
  hasError: boolean;
  label: string;
  name: string;
  control: Control<any>;
}

const Input = ({
  isFocused,
  hasError,
  label,
  control,
  name,
  ...rest
}: IInput) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View
      borderRadius={12}
      borderWidth={'$0.75'}
      paddingHorizontal={14}
      paddingTop={'$2.5'}
      paddingBottom={8}
      borderColor={
        hasError ? '$error500' : isFocused ? '$primary600' : '$gray200'
      }
    >
      <Text
        fontFamily={'$body'}
        fontSize={'$2'}
        color={isFocused ? '$primary500' : '$primary200'}
      >
        {label}
      </Text>

      <InputTMG
        value={field.value}
        onChangeText={field.onChange}
        unstyled
        color={'$primary600'}
        fontSize={'$4'}
        fontFamily={'$body'}
        marginTop={'$1.5'}
        {...rest}
      />
    </View>
  );
};

export default Input;
