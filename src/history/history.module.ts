import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {MongooseModule} from "@nestjs/mongoose";
import {WalletModel, WalletModelSchema} from "../wallet/wallet.model";
import {SpendingModel, SpendingModelSchema} from "../spending/spending.model";

@Module({
  controllers: [HistoryController],
  providers: [WalletService, SpendingService],
  imports: [
    MongooseModule.forFeature([
      {name: WalletModel.name, schema: WalletModelSchema},
      {name: SpendingModel.name, schema: SpendingModelSchema},
    ])
  ],
  exports: [WalletService, SpendingService],
})
export class HistoryModule {}
