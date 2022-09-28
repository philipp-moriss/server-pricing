import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {WalletService} from "../wallet/wallet.service";
import {SpendingService} from "../spending/spending.service";
import {SpendingModel} from "../spending/spending.model";
import {SpendingByUserIdDto, SpendingByWalletIdDto} from "./dto/history.dto";
import {deleteWalletDto} from "../wallet/dto/wallet.dto";
import {WalletModel} from "../wallet/wallet.model";
import {AddSpendingDto, UpdateSpendingDto} from "../spending/dto/spending.dto";

@Controller('history')
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
    async getHistoryWalletByUserId(@Query() {userId}: SpendingByUserIdDto): Promise<SpendingModel[] | null> {
        const history = await this.spendingService.getSpendingByUserId({userId});
        if (!history) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return history
    }


    @Put('spending')
    async updateSpending(@Body() dto : UpdateSpendingDto): Promise<SpendingModel | null>  {
        const currentSpending = await this.spendingService.getSpending({
            spendingId : dto.spending._id,
            userId : dto.userId,
            walletId : dto.walletId,
        })
        const updateSpending = await this.spendingService.updateSpending(dto)
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
    async addSpending(@Body() dto : AddSpendingDto) : Promise<SpendingModel | null> {
        const spending = await this.spendingService.addSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Create', HttpStatus.BAD_REQUEST);
        }
        const currentWallet = await this.walletService.getWallet(dto.walletId, dto.userId)
        if (!currentWallet) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }
        const currentBalance = currentWallet.balance - spending.amount
        const balance = await this.walletService.updateBalanceWallet({walletId: dto.walletId, balance: currentBalance})
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
    async deleteHistoryWalletByUserId(@Body() {userId}: SpendingByUserIdDto): Promise<{ deletedCount: number; } | null> {
        const deleteCount = await this.spendingService.deleteSpendingByUserId({userId});
        if (!deleteCount) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        return deleteCount
    }

    @Delete('wallet')
    async deleteWallet(@Body() {walletId, userId}: deleteWalletDto): Promise<WalletModel> {
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
    async deleteWallets(@Body() {userId}: deleteWalletDto): Promise<{ deletedCount: number; }> {
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
