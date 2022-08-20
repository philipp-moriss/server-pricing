import { Controller, Get } from '@nestjs/common';
import { readDB } from '../mockBd/readDB';
import { WalletModel } from './wallet.model';

@Controller('wallet')
export class WalletController {
  @Get()
  async getWallet() {
    return await readDB('wallet');
  }

  @Get('history')
  async getHistory() {
    const result = (await readDB('wallet')) as WalletModel;
    if (!result) return null;
    return result.history;
  }
}
