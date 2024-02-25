import {
  LocationAccuracy,
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';

export const requestUserLocationPermission = async (): Promise<{
  status: PermissionStatus;
  canAskAgain: boolean;
}> => {
  const { status, canAskAgain } = await requestForegroundPermissionsAsync();

  return {
    status,
    canAskAgain,
  };
};

export const getUserPosition = async (): Promise<{
  userLat: number;
  userLon: number;
}> => {
  const userPosition = await getCurrentPositionAsync({
    accuracy: LocationAccuracy.Highest,
  });

  return {
    userLat: userPosition.coords.latitude,
    userLon: userPosition.coords.longitude,
  };
};
