// model Transaction {
//   id               String            @id @map("id")
//   userId           String            @map("user_id")
//   userName         String            @map("user_name")
//   userEmail        String?           @map("user_email")
//   totalAmount      Int               @map("total_amount")
//   snapToken        String?           @map("snap_token")
//   snapUrl          String?           @map("snap_url")
//   status           TransactionStatus @map("status")
//   paymentMethod    String?           @map("payment_method")
//   createdAt        DateTime          @default(now()) @map("created_at")
//   updatedAt        DateTime          @updatedAt @map("updated_at")
//   transactionItems TransactionItem[]
//   user             User              @relation(fields: [userId], references: [id])

//   @@index([userId])
//   @@index([userName])
//   @@map("transactions")
// }

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
