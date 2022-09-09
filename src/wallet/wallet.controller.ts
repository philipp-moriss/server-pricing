import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query,} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {WalletModel} from './wallet.model';
import {addWalletDto, deleteWalletDto, getAllWalletsDto, getWalletDto, updateWalletDto} from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {
    }

    @Get()
    async getWallet(@Query() {walletId, userId}: getWalletDto): Promise<WalletModel> {
        const wallet = await this.walletService.getWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return wallet;
    }

    @Get('wallets')
    async getAllWallets(
        @Query() {userId}: getAllWalletsDto
    ): Promise<Array<string> | null> {
        const wallets = await this.walletService.getAllWallets(userId)
        if (!wallets) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return wallets
    }

    @Post()
    async addWallet(@Body() dto: addWalletDto): Promise<WalletModel | null> {
        const {userId, wallet} = dto
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
    async deleteWallet(@Body() {walletId, userId}: deleteWalletDto): Promise<WalletModel> {
        const wallet = await this.walletService.deleteWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return wallet;
    }
}
