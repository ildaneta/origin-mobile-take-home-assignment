import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUser, IUserData, UserState } from '../types/user';

type Actions = {
  setIsUserLogged: ({ isLogged }: Pick<IUser, 'isLogged'>) => void;
  setUserData: ({ email, name, uid, photoUrl }: IUserData) => void;
  setCurrentScreenName: ({
    currentScreenName,
  }: Pick<UserState, 'currentScreenName'>) => void;
  setFileName: ({ filename }: Pick<IUserData, 'filename'>) => void;
  resetUserData: () => void;
};

const initialState: UserState = {
  userData: {
    isLogged: false,
    uid: '',
    name: '',
    email: '',
    photoUrl: '',
    filename: '',
  },
  currentScreenName: 'loginOptions',
};

export const useUserStore = create<UserState & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setIsUserLogged: ({ isLogged }) => {
        const userState = get().userData;

        set({ userData: { ...userState, isLogged } });
      },

      setUserData: ({ email, name, uid, photoUrl }) => {
        const { isLogged, filename } = get().userData;

        set({
          userData: {
            isLogged,
            email,
            name,
            uid,
            photoUrl,
            filename,
          },
        });
      },

      setCurrentScreenName: ({ currentScreenName }) => {
        set({ currentScreenName });
      },

      setFileName: ({ filename }) => {
        const userDataState = get().userData;

        set({ userData: { ...userDataState, filename } });
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
