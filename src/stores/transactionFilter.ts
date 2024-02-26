import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TransactionFilterState } from '../types/transactionFilter';

type Actions = {
  setOrderByTransactionFilter: ({
    orderBy,
  }: Pick<TransactionFilterState, 'orderBy'>) => void;
  setValueTransactionFilter: ({
    value,
  }: Pick<TransactionFilterState, 'value'>) => void;

  resetFilter: () => void;
};

const initialState: TransactionFilterState = {
  orderBy: '',
  value: '',
};

export const useTransactionFilter = create<TransactionFilterState & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      setOrderByTransactionFilter: ({ orderBy }) => {
        set({ orderBy });
      },

      setValueTransactionFilter: ({ value }) => {
        set({ value });
      },

      resetFilter: () => {
        set(initialState);
      },
    }),
    {
      name: '@origin:transactionFilter',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
