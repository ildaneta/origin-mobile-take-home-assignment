import React from 'react';

import Text from './Text';

interface IErrorMessage {
  message: string | undefined;
}

const ErrorMessage = ({ message }: IErrorMessage): JSX.Element => {
  return (
    <Text
      color="$error500"
      fontSize={'$2'}
      marginTop={'$1.5'}
      marginLeft={'$1.5'}
    >
      {!!message ? message : ''}
    </Text>
  );
};

export default ErrorMessage;
