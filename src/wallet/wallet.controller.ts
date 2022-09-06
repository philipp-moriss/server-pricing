import {Body, Controller, Get, HttpException, HttpStatus, Post, Query,} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {SpendingModel} from '../spending/spending.model';
import {WalletModel} from './wallet.model';
import {addWalletDto, getAllWalletsDto, getSpendingDto, getWalletDto} from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {
    }

    @Post()
    async addWallet(@Body() dto: addWalletDto): Promise<WalletModel | null> {
        const {userId, ...wallet} = dto
        const result = await this.walletService.addWallet(userId, wallet)
        if (!result) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return result
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
        @Query() query: getAllWalletsDto
    ) : Promise<Array<string> | null> {
        const wallets = await this.walletService.getAllWallets(query.userId)
        if (!wallets) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return wallets
    }




    @Post('spending')
    async getSpending(@Body() dto: getSpendingDto): Promise<SpendingModel> {
        const spending = await this.walletService.getSpendingById(
            dto.walletId,
            dto.spendingId,
        );
        return spending;
    }
}
