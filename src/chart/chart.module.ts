import { Module } from '@nestjs/common';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {MongooseModule} from "@nestjs/mongoose";
import {WalletModel, WalletModelSchema} from "../wallet/wallet.model";
import {SpendingModel, SpendingModelSchema} from "../spending/spending.model";
import { ChartService } from './chart.service';

@Module({
    providers: [WalletService, SpendingService, ChartService],
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
            {name: SpendingModel.name, schema: SpendingModelSchema},
        ])
    ],
    exports: [WalletService, SpendingService, ChartService],
})
export class ChartModule {}
