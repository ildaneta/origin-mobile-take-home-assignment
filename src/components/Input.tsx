import React from 'react';
import { View, Text, Input as InputTMG, InputProps, Button } from 'tamagui';

import { Control, useController } from 'react-hook-form';

interface IInput extends InputProps {
  isFocused: boolean;
  hasError: boolean;
  label: string;
  name: string;
  control: Control<any>;
  iconButton?: JSX.Element;
  iconButtonPress?: () => void;
}

const Input = ({
  isFocused,
  hasError,
  label,
  control,
  name,
  iconButton,
  iconButtonPress,
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
      borderColor={hasError ? '$error500' : '$gray200'}
    >
      <Text
        fontFamily={'$body'}
        fontSize={'$3'}
        color={isFocused ? '$primary500' : '$primary200'}
      >
        {label}
      </Text>

      <View flexDirection="row" alignItems="center">
        <InputTMG
          value={field.value}
          onChangeText={field.onChange}
          unstyled
          color={'$primary600'}
          fontSize={'$4'}
          fontFamily={'$body'}
          marginTop={'$1.5'}
          width={'90%'}
          {...rest}
        />

        {!!iconButton && (
          <Button
            onPress={iconButtonPress}
            unstyled
            pressStyle={{ opacity: 0.7 }}
            width={'10%'}
            alignItems="center"
          >
            {iconButton}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Input;
