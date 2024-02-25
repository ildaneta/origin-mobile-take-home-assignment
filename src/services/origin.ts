import { API } from '../api';

import { AxiosResponse } from 'axios';

import {
  IGetTransactionsDetails,
  IGetTransactionsList,
  IGetTransactionsListResponse,
  IPostUpdateTransactionCoordinates,
  IPostUploadTransactionReceipt,
  ITransactionsItem,
} from '../types/transaction';

export const OriginAPI = {
  getTransactionsList: async ({
    pageNumber,
    pageSize,
  }: IGetTransactionsList): Promise<
    AxiosResponse<IGetTransactionsListResponse>
  > => {
    return await API.get(
      `transactions?page=${pageNumber}&pageSize=${pageSize}`
    );
  },

  getTransactionsDetails: async ({
    id,
  }: IGetTransactionsDetails): Promise<AxiosResponse<ITransactionsItem>> => {
    return await API.get(`transactions/${id}`);
  },

  postUpdateTransactionCoordinates: async ({
    id,
    lat,
    lon,
  }: IPostUpdateTransactionCoordinates) => {
    return await API.post(`transactions/${id}/coordinates`, {
      Lat: lat,
      Lon: lon,
    });
  },

  postUploadTransactionReceipt: async ({
    id,
    receiptImageUrl,
  }: IPostUploadTransactionReceipt) => {
    return await API.post(`transactions/${id}/receipt`, {
      ReceiptImageUrl: receiptImageUrl,
    });
  },
};
