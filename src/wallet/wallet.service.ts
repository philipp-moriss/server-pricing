import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {readDB} from '../mockBd/readDB';
import {WalletModel} from './wallet.model';
import {SpendingModel} from '../spending/spending.model';
import {UsersService} from '../user/users.service';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {addWalletDto} from "./dto/wallet.dto";

@Injectable()
export class WalletService {

    constructor(
        private usersService: UsersService,
        @InjectModel(WalletModel.name) private walletModel: Model<WalletModel>,
    ) {
    }

    async addWallet(userId: string, wallet: Omit<addWalletDto, 'userId'>) : Promise<WalletModel | null> {
        try {
            const newWallet = new this.walletModel({...wallet})
            if (!newWallet) {
                return null
            }
            await newWallet.save()
            const currentUser = await this.usersService.getUserById(userId)
            if (!currentUser) {
                return null
            }
            currentUser.walletsId.push(newWallet._id)
            const updateUser = await this.usersService.updateUserById(userId, currentUser)
            if (!updateUser) {
                return null
            }
            return newWallet
        }catch (e) {
            console.log(e)
        }
    }

    async getAllWallets(userId: string) : Promise<Array<string> | null> {
        const currentUser = await this.usersService.getUserById(userId)
        if (!currentUser || !currentUser.walletsId){
            return null
        }
        return currentUser.walletsId
    }

    async getWallet(walletId: string, userId : string): Promise<WalletModel | null> {
        const currentUser = await this.usersService.getUserById(userId)
        if (!currentUser || !currentUser.walletsId){
            return null
        }
        const currentWalletId = currentUser.walletsId.find((walletIdItem) => String(walletIdItem) === walletId)
        if (!currentWalletId) {
            return null
        }
        return this.walletModel.findById({_id: currentWalletId});
    }



    async getSpendingById(
        walletId: string,
        spendingId: string,
    ): Promise<SpendingModel> {
        const wallets = (await readDB('wallet')) as Array<WalletModel>;
        if (!wallets) return null;
        const history = wallets.find((wallet) => wallet._id === walletId)?.history;
        if (!history) return null;
        return history.find((spending) => spending._id === spendingId);
    }
}
