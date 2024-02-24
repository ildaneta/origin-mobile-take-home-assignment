import 'react-native-gesture-handler';

import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Routes } from './src/routes';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded && fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <Routes />
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
