import { createTamagui } from 'tamagui';

import { fonts } from './src/theme/fonts';
import { tokens } from './src/theme/tokens';

const config = createTamagui({
  fonts: {
    body: fonts,
    heading: fonts,
  },

  tokens,

  themes: {
    light: {
      bg: tokens.color.white,
      color: tokens.color.primary100,
    },
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
