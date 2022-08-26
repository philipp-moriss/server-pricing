import { Injectable } from '@nestjs/common';
import { readDB } from '../mockBd/readDB';
import { WalletModel } from './wallet.model';
import { SpendingModel } from '../spending/spending.model';

@Injectable()
export class WalletService {
  async getWallet(walletId: string): Promise<WalletModel> {
    const wallets = (await readDB('wallet')) as Array<WalletModel>;
    return wallets.find((wallet) => wallet._id === walletId);
  }

  async getAllHistoryWallet(walletId: string): Promise<Array<SpendingModel>> {
    const wallets = (await readDB('wallet')) as Array<WalletModel>;
    if (!wallets) return null;
    const history = wallets.find((wallet) => wallet._id === walletId).history;
    return history;
  }

  async getSpendingById(
    walletId: string,
    spendingId: string,
  ): Promise<SpendingModel> {
    const wallets = (await readDB('wallet')) as Array<WalletModel>;
    if (!wallets) return null;
    const history = wallets.find((wallet) => wallet._id === walletId).history;
    return history.find((spending) => spending._id === spendingId);
  }
}
