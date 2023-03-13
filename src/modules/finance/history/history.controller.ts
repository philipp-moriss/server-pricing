import {Body, Controller, Delete, Get, HttpException, HttpStatus, Query, UseGuards} from '@nestjs/common';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {SpendingModel} from "../../../models/spending.model";
import {User} from "../../../common/decarators/user.decarator";
import {WalletId} from "../../../common/dto/common.dto";
import {AuthGuard} from "../../../common/guards/auth.guard";
import * as moments from "moment/moment";
import {sortWalletHistory} from "../../../common/utils/utils";
import {ReplenishmentService} from "../replenishment/replenishment.service";
import {getHistoryByParamsDto} from "./dto/history.dto";


@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {

    constructor(
        private walletService: WalletService,
        private replenishmentService: ReplenishmentService,
        private spendingService: SpendingService,
    ) {
    }


    @Get()
    async getHistoryWalletByWalletId(@Query() {walletId}: WalletId): Promise<SpendingModel[] | null> {
        const history = await this.spendingService.getSpendingByParameters({walletId});
        if (!history) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }
        return history
    }

    @Get("last-five-spending")

    async getLastFiveSpendingHistory(@Query() {
        walletId
    }: any, @User('_id') userId: string): Promise<SpendingModel[] | null> {
        const dto = {walletId, userId}
        const spending = await this.spendingService.getSpendingByParameters(dto)
        if (!spending) {
            throw new HttpException('Трат не найдено', HttpStatus.BAD_REQUEST);
        }
        return spending.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, 5)
    }
    @Get("last-five-income")
    async getLastFiveIncomeHistory(@Query() {
        walletId
    }: any, @User('_id') userId: string): Promise<SpendingModel[] | null> {
        const dto = {walletId, userId}
        const incomes = await this.replenishmentService.getReplenishmentsByParameters(dto)
        if (!incomes) {
            throw new HttpException('Доходов не найдено', HttpStatus.BAD_REQUEST);
        }
        return incomes.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, 5)
    }

    @Get('allUserHistory')
    async getHistoryWalletByUserId(@User('_id') userId: string, @Query() queryParams: getHistoryByParamsDto) {
        const dateStart = queryParams?.dateStart ? new Date(+queryParams?.dateStart).setUTCHours(0,0,0,0) : null
        const dateEnd = queryParams?.dateEnd ? new Date(+queryParams?.dateEnd).setUTCHours(23,59,0,0): null

        const paramsForSearchOperations = {
            date: {
                $gte: dateStart,
                $lt: dateEnd
            },
            userId,
            walletId: queryParams.walletId
        }
        if (!paramsForSearchOperations.date?.$gte) {
            delete paramsForSearchOperations.date.$gte
        }
        if (!paramsForSearchOperations.date?.$lt) {
            delete paramsForSearchOperations.date.$lt
        }
        if ((!paramsForSearchOperations.date?.$gte && !paramsForSearchOperations.date?.$lt)) {
            delete paramsForSearchOperations.date
        }
        const currentWallet = await this.walletService.getWallet(queryParams.walletId, userId)
        let history = queryParams?.showHistory === 'income'
            ? await this.replenishmentService.getReplenishmentsByParameters(paramsForSearchOperations)
            : await this.spendingService.getSpendingByParameters(paramsForSearchOperations);
        if (!history) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        if (queryParams.selectedCategory) {
            history = history.filter((operation) => operation.category.toLowerCase() === queryParams.selectedCategory.toLowerCase())
        }
        if (queryParams.sortBy) {
            history = sortWalletHistory(history, queryParams.sortBy, queryParams.sortDecreasing)
        }

        return {
            historyData: history,
            date: {
                dateStart: dateStart ? dateStart : null,
                dateEnd: dateEnd ? dateEnd : null
            },
            showChart: queryParams?.showHistory,
            walletName: currentWallet?.name
        }
    }


    @Delete()
    async deleteHistoryWalletByWalletId(@Body() {walletId}: WalletId): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByParams({walletId});
        if (!deleteCount) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }

    @Delete('allUserHistory')
    async deleteHistoryWalletByUserId(@User('_id') userId: string): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByParams({userId});
        if (!deleteCount) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }
}
