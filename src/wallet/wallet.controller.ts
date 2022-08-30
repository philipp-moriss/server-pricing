import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SpendingModel } from '../spending/spending.model';
import { WalletModel } from './wallet.model';
import { getSpendingDto } from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async getWallet(@Query('walletId') walletId: string): Promise<WalletModel> {
    const wallet = await this.walletService.getWallet(walletId);
    if (!walletId) {
      throw new HttpException('wallet not found', 400);
    }
    return wallet;
  }

  @Get('history')
  async getHistory(
    @Query('walletId') walletId: string,
  ): Promise<Array<SpendingModel>> {
    const history = await this.walletService.getAllHistoryWallet(walletId);
    return history;
  }

  @Post('spending')
  async getSpending(@Body() dto: getSpendingDto): Promise<SpendingModel> {
    const spending = await this.walletService.getSpendingById(
      dto.walletId,
      dto.spendingId,
    );
    return spending;
  }
}