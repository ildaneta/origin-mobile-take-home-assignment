import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Image, View } from 'tamagui';

import Container from '../../components/Container';
import Text from '../../components/Text';
import TransactionDetailsItem from './components/TransactionDetailsItem';
import HeaderBack from '../../components/HeaderBack';
import Upload from '../../components/Upload';
import ThinnyButton from '../../components/ThinnyButton';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackRoutes } from '../../routes/stack.routes';

import * as ImagePicker from 'expo-image-picker';

import storage from '@react-native-firebase/storage';

import { IS_IOS, SCREEN_WIDTH } from '../../utils/device';

import { useUserStore } from '../../stores/user';

import { OriginAPI } from '../../services/origin';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {
  getUserPosition,
  requestUserLocationPermission,
} from '../../helpers/userLocation';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUserCoordinates {
  lat: number;
  lon: number;
}

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
  const [userCoordinates, setUserCoordinates] = useState<IUserCoordinates>(
    {} as IUserCoordinates
  );
  const [isLoadingUserCoordinates, setIsLoadingUserCoordinates] =
    useState(false);

  const {
    userData: { uid },
  } = useUserStore();

  const { goBack } =
    useNavigation<NavigationProp<StackRoutes, 'transactionDetails'>>();
  const insets = useSafeAreaInsets();

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

  const requestUserLocation = async () => {
    const { status, canAskAgain } = await requestUserLocationPermission();

    if (status !== 'granted' && !canAskAgain) {
      Alert.alert(
        'Sorry, you refused the request',
        'To attach your current location is necessary to allow the permission'
      );

      return;
    }

    if (status !== 'granted' && canAskAgain) {
      const { status } = await requestUserLocationPermission();

      if (status === 'granted') {
        const { userLat, userLon } = await getUserPosition();

        updateUserLocation(userLat, userLon);
      }

      if (status !== 'granted') {
        Alert.alert(
          'Sorry, you refused the request',
          'To attach your current location is necessary to allow the permission'
        );

        return;
      }
    }

    if (status === 'granted') {
      const { userLat, userLon } = await getUserPosition();

      updateUserLocation(userLat, userLon);
    }
  };

  const updateUserLocation = async (lat: number, lon: number) => {
    setIsLoadingUserCoordinates(true);

    try {
      await OriginAPI.postUpdateTransactionCoordinates({
        id: Id,
        lat,
        lon,
      }).then(() => {
        setUserCoordinates({ lat, lon });
      });
    } catch (error) {
      console.error('Error updating transaction coordinates: ', error);
    } finally {
      setIsLoadingUserCoordinates(false);

      Alert.alert('Sorry, we had an error', 'Please, try again');
    }
  };

  const Map = () => (
    <View>
      <Text
        marginTop={39}
        marginBottom={12}
        fontSize={'$3'}
        color="$primary300"
      >
        Location
      </Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: SCREEN_WIDTH - 40, height: 200, marginBottom: 20 }}
        initialRegion={{
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          latitude: !!userCoordinates.lat ? userCoordinates.lat : Lat,
          longitude: !!userCoordinates.lon ? userCoordinates.lon : Lon,
        }}
      >
        <Marker
          coordinate={{
            latitude: !!userCoordinates.lat ? userCoordinates.lat : Lat,
            longitude: !!userCoordinates.lon ? userCoordinates.lon : Lon,
          }}
        />
      </MapView>

      <ThinnyButton
        hasBackground={false}
        label="Attach your current position"
        onPress={requestUserLocation}
        isLoading={isLoadingUserCoordinates}
        enabled={!isLoadingUserCoordinates}
      />
    </View>
  );

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

  const Header = () => (
    <View paddingHorizontal={10} marginTop={insets.top + 16} paddingBottom={20}>
      <HeaderBack onPress={goBack} />
    </View>
  );

  return (
    <>
      <Header />

      <Container>
        <TransactionDetailsItem
          date={Date}
          vendor={Vendor}
          amount={Amount}
          type={Type}
          category={Category}
        />

        <Map />

        <Receipt />

        <View height={20} />
      </Container>
    </>
  );
};

export default TransactionDetails;
