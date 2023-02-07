import {Body, Controller, Delete, Get, HttpException, HttpStatus, Query, UseGuards} from '@nestjs/common';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {SpendingModel} from "../../../models/spending.model";
import {User} from "../../../common/decarators/user.decarator";
import {UserId, WalletId} from "../../../common/dto/common.dto";
import {AuthGuard} from "../../../common/guards/auth.guard";




@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {

    constructor(
        private walletService: WalletService,
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
        return spending.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1 ).slice(1, 5)
    }
    @Get('allUserHistory')
    async getHistoryWalletByUserId(@User('_id') {userId} : UserId): Promise<SpendingModel[] | null> {
        const history = await this.spendingService.getSpendingByParameters({userId : userId});
        if (!history) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return history
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
    async deleteHistoryWalletByUserId(@User('_id') userId : string): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByParams({userId});
        if (!deleteCount) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }
}
