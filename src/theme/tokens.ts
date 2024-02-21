import { createTokens } from 'tamagui';
import { config } from '@tamagui/config/v2-native';

export const tokens = createTokens({
  ...config.tokens,

  color: {
    white: '#fff',

    green: '#0E7505',

    primary100: '#999',
    primary200: '#888',
    primary300: '#666',
    primary400: '#555',
    primary500: '#444',
    primary600: '#333',
    primary700: '#111',

    gray100: '#efecec',
    gray200: '#d9d9d9',
    gray300: '#a7a7a7',

    error50: '#ffcaca',
    error500: '#ec4848',

    success500: '#0e7505',

    focus500: '#111',
  },
});
