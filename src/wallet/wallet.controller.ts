import {Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query, Req, UseGuards,} from '@nestjs/common';
import { Types } from 'mongoose';
import {WalletService} from './wallet.service';
import {WalletModel} from './wallet.model';
import {addWalletDto, getWalletDto, updateWalletDto} from './dto/wallet.dto';
import {AuthGuard} from "../guards/auth.guard";
import {Request} from 'express'
import {User} from "../decarators/user.decarator";
import {log} from "util";




@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
    constructor(private walletService: WalletService) {
    }

    @Get()
    async getWallet(@Query() {walletId}: getWalletDto, @User('_id') userId : string): Promise<WalletModel> {
        const wallet = await this.walletService.getWallet(walletId, userId);
        if (!wallet) {
            throw new HttpException('walletId not Found', HttpStatus.NOT_FOUND);
        }
        return wallet;
    }

    @Get('wallets')
    async getAllWallets(
        @User('_id') userId : string
    ): Promise<Array<WalletModel> | null> {
        const wallets = await this.walletService.getAllWallets(userId)
        if (!wallets) {
            throw new HttpException('userId not Found', HttpStatus.NOT_FOUND);
        }
        return wallets
    }
  @Get('currency-list')
  async getCurrencyList(): Promise<{_id: any, value: string}[]> {
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
    async addWallet(@Body() dto: addWalletDto, @User('_id') userId : string): Promise<WalletModel | null> {
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
}
