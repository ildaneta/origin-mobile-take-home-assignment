import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUser, UserState } from '../types/user';

type Actions = {
  setIsUserLogged: ({ isLogged }: Pick<IUser, 'isLogged'>) => void;
  resetUserData: () => void;
};

const initialState: UserState = {
  userData: {
    isLogged: false,
  },
};

export const useUserStore = create<UserState & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      setIsUserLogged: ({ isLogged }) => {
        set({ userData: { isLogged } });
      },

      resetUserData: () => {
        set(initialState);
      },
    }),
    {
      name: '@origin:user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
