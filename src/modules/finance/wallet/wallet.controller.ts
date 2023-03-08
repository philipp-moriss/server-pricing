import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {Types} from 'mongoose';
import {WalletService} from './wallet.service';
import {addWalletDto, deleteWalletDto, getWalletDto, updateWalletDto} from './dto/wallet.dto';
import {WalletModel} from "../../../models/wallet.model";
import {User} from "../../../common/decarators/user.decarator";
import {SpendingService} from "../spending/spending.service";
import {AuthGuard} from "../../../common/guards/auth.guard";




@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
    constructor(
        private walletService: WalletService,
        private spendingService: SpendingService,
    ) {
    }

    @Get()
    async getWallet(@Query() {walletId}: getWalletDto, @User('_id') userId: string): Promise<WalletModel> {
        const wallet = await this.walletService.getWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return wallet;
    }

    @Get('wallets')
    async getAllWallets(@User('_id') userId: string): Promise<Array<WalletModel> | null> {
        const wallets = await this.walletService.getAllWallets(userId)
        if (!wallets) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return wallets
    }

    @Get('currency-list')
    async getCurrencyList(): Promise<{ _id: any, value: string }[]> {
        const currencyList = [
            {
                _id: new Types.ObjectId(),
                value: "USD"
            },
            {
                _id: new Types.ObjectId(),
                value: "EUR"
            },
            {
                _id: new Types.ObjectId(),
                value: "BY"
            },
        ]
        return currencyList;
    }

    @Post()
    async addWallet(@Body() dto: addWalletDto, @User('_id') userId: string): Promise<WalletModel | null> {
        const {wallet} = dto
        const result = await this.walletService.addWallet(userId, wallet)
        if (!result) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return result
    }

    @Put()
    async updateWallet(@Body() dto: updateWalletDto): Promise<WalletModel | null> {
        const updateWallet = await this.walletService.updateWallet(dto)
        if (!updateWallet) {
            throw new HttpException('userId or walletId not Found', HttpStatus.NOT_FOUND);
        }
        return updateWallet
    }

    @Delete()
    async deleteWallet(@Body() {walletId}: deleteWalletDto, @User('_id') userId: string): Promise<WalletModel> {
        const wallet = await this.walletService.deleteWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        const spending = await this.spendingService.deleteSpendingByParams({walletId})
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
        const spending = await this.spendingService.deleteSpendingByParams({userId})
        if (!spending) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return deletedCount;
    }
}
