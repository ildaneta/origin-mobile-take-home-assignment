export enum TransactionType {
  invoice = 'invoice',
  deposit = 'deposit',
  payment = 'payment',
  withdrawal = 'withdrawal',
}

export enum TransactionCategory {
  shopping = 'shopping',
  entertainment = 'entertainment',
  drinks_and_dinning = 'drinks and dinning',
}

export interface IGetTransactionsList {
  pageNumber: number;
  pageSize: number;
}

export interface IGetTransactionsDetails {
  id: number;
}

export interface IGetTransactionsListResponse {
  Page: number;
  PageSize: number;
  TotalRecords: number;
  TotalPages: number;
  Transactions: Array<ITransactionsItem>;
}

export interface IPostUpdateTransactionCoordinates {
  id: number;
  lat: number;
  lon: number;
}

export interface IPostUploadTransactionReceipt {
  id: number;
  receiptImageUrl: string;
}

export interface ITransactionsItem {
  Id: number;
  Amount: number;
  Date: Date;
  Vendor: string;
  Type: TransactionType;
  Category: TransactionCategory;
  Lat: number;
  Lon: number;
  ReceiptImage: string | null;
}
