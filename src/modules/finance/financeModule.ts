import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {WalletController} from "./wallet/wallet.controller";
import {ChartController} from "./chart/chart.controller";
import {SpendingService} from "./spending/spending.service";
import {ReplenishmentService} from "./replenishment/replenishment.service";
import {HistoryController} from "./history/history.controller";
import {WalletService} from "./wallet/wallet.service";
import {ChartService} from "./chart/chart.service";
import {SpendingModel, SpendingModelSchema} from "../../models/spending.model";
import {WalletModel, WalletModelSchema} from "../../models/wallet.model";
import {ReplenishmentModel, ReplenishmentModelSchema} from "../../models/replenishment.model";
import {SpendingController} from "./spending/spending.controller";
import {ReplenishmentController} from "./replenishment/replenishment.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
            {name: SpendingModel.name, schema: SpendingModelSchema},
            {name: ReplenishmentModel.name, schema: ReplenishmentModelSchema},
        ]),
    ],
    controllers: [
        WalletController,
        SpendingController,
        ReplenishmentController,
        HistoryController,
        ChartController,
    ],
    providers: [
        WalletService,
        SpendingService,
        ReplenishmentService,
        ChartService,
    ],
    exports: [
    ],
})
export class FinanceModule {}
