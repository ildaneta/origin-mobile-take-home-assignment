import React from 'react';
import { Text as TextTMG, TextProps } from 'tamagui';

interface IText extends TextProps {
  children: string;
}

const Text = ({ children, ...rest }: IText): JSX.Element => {
  return (
    <TextTMG maxFontSizeMultiplier={1.1} fontFamily={'$body'} {...rest}>
      {children}
    </TextTMG>
  );
};

export default Text;
