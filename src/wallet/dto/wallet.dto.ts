export class getSpendingDto {
  walletId: string;
  spendingId: string;
}

export class addWalletDto {
  userId: string;
  icon: string;
  name: string;
  balance: number;
  currency: string;
}
