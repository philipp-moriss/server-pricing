import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {SpendingModel} from "../spending/spending.model";
import {SpendingByUserIdDto, SpendingByWalletIdDto, UpdateSpendingDto} from "./dto/history.dto";
import {deleteWalletDto} from "../wallet/dto/wallet.dto";
import {WalletModel} from "../wallet/wallet.model";
import {AddSpendingDto} from "../spending/dto/spending.dto";
import {AuthGuard} from "../guards/auth.guard";
import {Request} from "express";
import {User} from "../decarators/user.decarator";



@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {

    constructor(
        private walletService: WalletService,
        private spendingService: SpendingService,
    ) {
    }


    @Get()
    async getHistoryWalletByWalletId(@Query() {walletId}: SpendingByWalletIdDto): Promise<SpendingModel[] | null> {
        const history = await this.spendingService.getSpendingByWalletId({walletId});
        if (!history) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }
        return history
    }

    @Get('allUserHistory')
    async getHistoryWalletByUserId(@User('_id') userId : string): Promise<SpendingModel[] | null> {
        const history = await this.spendingService.getSpendingByUserId({userId});
        if (!history) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return history
    }


    @Put('spending')
    async updateSpending(@Body() {spending, walletId} : UpdateSpendingDto,@User('_id') userId : string): Promise<SpendingModel | null>  {
        const dto = {spending, walletId, userId}
        const currentSpending = await this.spendingService.getSpending({
            spendingId : dto.spending._id,
            userId : dto.userId,
            walletId : dto.walletId,
        })
        const updateSpending = await this.spendingService.updateSpending(dto)
        console.log(updateSpending)
        if (!updateSpending) {
            throw new HttpException('spending not Update', HttpStatus.BAD_REQUEST);
        }
        if (currentSpending.amount !== updateSpending.amount) {
            let currentBalance = 0;
            const currentWallet = await this.walletService.getWallet(dto.walletId, dto.userId)
            if (!currentWallet) {
                throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
            }
            if (currentSpending.amount > updateSpending.amount){
                const balance = currentSpending.amount - updateSpending.amount
                currentBalance = currentWallet.balance + balance
            }
            if (currentSpending.amount < updateSpending.amount){
                const balance = updateSpending.amount - currentSpending.amount
                currentBalance = currentWallet.balance - balance
            }
            const balanceWallet = await this.walletService.updateBalanceWallet({walletId: dto.walletId, balance: currentBalance})
            if (!balanceWallet) {
                throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
            }
        }
        return updateSpending
    }

    @Post('spending')
    async addSpending(@Body() {spending : spendingDto, walletId} : AddSpendingDto, @User('_id') userId : string) : Promise<SpendingModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }

        const walletCurrency = currentWallet.currency;
        const walletName = currentWallet.name
        const spending = await this.spendingService.addSpending({
            userId,
            walletId,
            spending: {...spendingDto, currency : walletCurrency, walletName: walletName}
        })
        if (!spending) {
            throw new HttpException('spending not Create', HttpStatus.BAD_REQUEST);
        }

        const currentBalance = currentWallet.balance - spending.amount
        const balance = await this.walletService.updateBalanceWallet({walletId, balance: currentBalance})
        if (!balance) {
            throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

    @Delete()
    async deleteHistoryWalletByWalletId(@Body() {walletId}: SpendingByWalletIdDto): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByWalletId({walletId});
        if (!deleteCount) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }

    @Delete('allUserHistory')
    async deleteHistoryWalletByUserId(@User('_id') userId : string): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByUserId({userId});
        if (!deleteCount) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }

    @Delete('wallet')
    async deleteWallet(@Body() {walletId}: deleteWalletDto, @User('_id') userId : string): Promise<WalletModel> {
        const wallet = await this.walletService.deleteWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        const spending = await this.spendingService.deleteSpendingByWalletId({walletId})
        if (!spending) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return wallet;
    }


    @Delete('wallets')
    async deleteWallets(@User('_id') userId : string): Promise<{ deletedCount: number; }> {
        const deletedCount = await this.walletService.deleteWallets(userId);
        if (!deletedCount) {
            throw new HttpException('wallets not delete', HttpStatus.NOT_FOUND);
        }
        const spending = await this.spendingService.deleteSpendingByUserId({userId})
        if (!spending) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return deletedCount;
    }
}
