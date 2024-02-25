import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Image, View } from 'tamagui';

import Container from '../../components/Container';
import Text from '../../components/Text';
import TransactionDetailsItem from './components/TransactionDetailsItem';
import HeaderBack from '../../components/HeaderBack';
import Upload from '../../components/Upload';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

import * as ImagePicker from 'expo-image-picker';

import storage from '@react-native-firebase/storage';

import { IS_IOS } from '../../utils/device';

import { useUserStore } from '../../stores/user';

import { OriginAPI } from '../../services/origin';

const TransactionDetails = (): JSX.Element => {
  const {
    params: {
      Date,
      Vendor,
      Amount,
      Type,
      Category,
      Lat,
      Lon,
      Id,
      ReceiptImage,
    },
  } = useRoute<RouteProp<StackRoutes, 'transactionDetails'>>();

  const [transactionReceiptURL, setTransactionReceiptURL] =
    useState(ReceiptImage);
  const [isLoadingReceiptUpload, setIsLoadingReceiptUpload] = useState(false);

  const {
    userData: { uid },
  } = useUserStore();

  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'transactionDetails'>>();

  const pickReceiptImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = IS_IOS ? uri.replace('file://', '') : uri;

      uploadReceipt(filename, uploadUri);
    }
  };

  const uploadReceipt = async (filename: string, uploadUri: string) => {
    try {
      setIsLoadingReceiptUpload(true);

      const storageRef = storage().ref(
        `user-photo/${uid}/receipts/${filename}`
      );

      await storageRef.putFile(uploadUri);
      const downloadURL = await storageRef.getDownloadURL();

      await OriginAPI.postUploadTransactionReceipt({
        receiptImageUrl: downloadURL,
        id: Id,
      })
        .then(() => {
          setTransactionReceiptURL(downloadURL);
        })
        .catch((error) => {
          console.error('Error setting receipt within API:', error);
          setTransactionReceiptURL('');

          Alert.alert(
            'Sorry, we had an error',
            'Please, upload again your receipt'
          );
        });
    } catch (error) {
      console.error('Error downloading receipt: ', error);

      Alert.alert(
        'Sorry, we had an error',
        'Please, upload again your receipt'
      );
    } finally {
      setIsLoadingReceiptUpload(false);
    }
  };

  const Receipt = () => (
    <>
      <Text
        marginTop={39}
        marginBottom={12}
        fontSize={'$3'}
        color="$primary300"
      >
        {!!transactionReceiptURL ? 'Receipt' : 'Attach receipt'}
      </Text>

      {isLoadingReceiptUpload ? (
        <ActivityIndicator size={'small'} color="#111" />
      ) : !!transactionReceiptURL ? (
        <View>
          <Image
            source={{ uri: transactionReceiptURL }}
            width={120}
            height={120}
            resizeMode="contain"
          />
        </View>
      ) : (
        <Upload
          allowedTypes="JPG, JPEG, PNG"
          onPress={pickReceiptImage}
          hasError={false}
          borderType="dashed"
        />
      )}
    </>
  );

  return (
    <Container>
      <>
        <View marginTop={20} marginBottom={30}>
          <HeaderBack onPress={goBack} />
        </View>

        <TransactionDetailsItem
          date={Date}
          vendor={Vendor}
          amount={Amount}
          type={Type}
          category={Category}
        />

        <Receipt />

        <Text
          marginTop={39}
          marginBottom={12}
          fontSize={'$3'}
          color="$primary300"
        >
          Location
        </Text>
      </>
    </Container>
  );
};

export default TransactionDetails;
