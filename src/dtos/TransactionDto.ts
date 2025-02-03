export interface ICreateTransactionRequest {
  userId: string;
  username: string;
  userState: string;
  userEmail?: string;
  couponPackageId?: number;
  membershipTypeId?: number;
}

export interface ICreateTransactionResponse {
  id: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  snapToken: string;
  snapUrl: string;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionNotifRequest {
  transactionId: string;
  transactionStatus: string;
  fraudStatus: string;
  statusCode: string;
  grossAmount: string;
  paymentType: string;
}
