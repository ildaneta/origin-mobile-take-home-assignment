import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUser, IUserData, UserState } from '../types/user';

type Actions = {
  setIsUserLogged: ({ isLogged }: Pick<IUser, 'isLogged'>) => void;
  setUserData: ({ email, name, uid }: IUserData) => void;
  resetUserData: () => void;
};

const initialState: UserState = {
  userData: {
    isLogged: false,
    uid: '',
    name: '',
    email: '',
  },
};

export const useUserStore = create<UserState & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setIsUserLogged: ({ isLogged }) => {
        const userState = get().userData;

        set({ userData: { ...userState, isLogged } });
      },

      setUserData: ({ email, name, uid }) => {
        const { isLogged } = get().userData;

        set({
          userData: {
            isLogged,
            email,
            name,
            uid,
          },
        });
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
