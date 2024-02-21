import { createFont } from 'tamagui';

export const fonts = createFont({
  family: 'Poppins_400Regular',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 22,
    true: 16,
  },
  face: {
    400: { normal: 'Poppins_400Regular' },
    500: { normal: 'Poppins_500Medium' },
    600: { normal: 'Poppins_600SemiBold' },
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
  },
});
