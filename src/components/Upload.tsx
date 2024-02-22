import React from 'react';
import { View } from 'tamagui';
import { Upload as UploadIcon } from '@tamagui/lucide-icons';

import { RectButton } from 'react-native-gesture-handler';

import Text from './Text';

interface IUpload {
  label?: string;
  allowedTypes: string;
  onPress: () => void;
  borderType: 'dashed' | 'solid';

  hasError: boolean;
}

const Upload = ({
  label,
  allowedTypes,
  onPress,
  borderType = 'solid',

  hasError,
}: IUpload): JSX.Element => {
  return (
    <View
      borderWidth={1.5}
      borderStyle={borderType}
      borderRadius={12}
      paddingHorizontal={14}
      paddingTop={'$2.5'}
      paddingBottom={16}
      borderColor={hasError ? '$error500' : '$gray200'}
    >
      {!!label && (
        <Text fontSize={'$3'} marginBottom={20} color={'$primary200'}>
          {label}
        </Text>
      )}

      <Text
        alignSelf="center"
        color="$primary300"
        fontSize={'$2'}
        marginBottom={4}
      >
        {allowedTypes}
      </Text>

      <RectButton
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#666',
          width: '60%',
          alignSelf: 'center',
          padding: 6,
          borderRadius: 12,
        }}
      >
        <Text fontSize={'$3'} lineHeight={22} marginRight={4} color="$white">
          Choose file
        </Text>

        <UploadIcon size={18} color={'$white'} />
      </RectButton>
    </View>
  );
};

export default Upload;
