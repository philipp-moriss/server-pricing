import {Module} from '@nestjs/common';
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
import {CategoryIncomeController} from "./categories/categoriesIncome/categoryIncome.controller";
import {CategoryIncomeService} from "./categories/categoriesIncome/categoryIncome.service";
import {CategoryIncomeModel, CategorySpendSchema} from "../../models/categoryIncome.model";
import {CategorySpendController} from "./categories/categoriesSpend/categorySpend.controller";
import {CategorySpendService} from "./categories/categoriesSpend/categorySpend.service";
import {CategoryModelSchema, CategorySpendModel} from "../../models/categorySpend.model";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
            {name: SpendingModel.name, schema: SpendingModelSchema},
            {name: ReplenishmentModel.name, schema: ReplenishmentModelSchema},
            {name: CategoryIncomeModel.name, schema: CategoryModelSchema},
            {name: CategorySpendModel.name, schema: CategorySpendSchema},
        ]),
    ],
    controllers: [
        WalletController,
        SpendingController,
        ReplenishmentController,
        HistoryController,
        ChartController,
        CategoryIncomeController,
        CategorySpendController
    ],
    providers: [
        WalletService,
        SpendingService,
        ReplenishmentService,
        ChartService,
        CategoryIncomeService,
        CategorySpendService
    ],
    exports: [],
})
export class FinanceModule {
}
