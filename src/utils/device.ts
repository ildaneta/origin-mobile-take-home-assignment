import { Dimensions, Platform, StatusBar } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export {
  IS_ANDROID,
  IS_IOS,
  ANDROID_STATUS_BAR_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
