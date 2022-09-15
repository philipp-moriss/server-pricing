import {Injectable} from '@nestjs/common';
import {WalletModel} from './wallet.model';
import {UsersService} from '../user/users.service';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {updateWalletDto, Wallet} from "./dto/wallet.dto";

@Injectable()
export class WalletService {

    constructor(
        private usersService: UsersService,
        @InjectModel(WalletModel.name) private walletModel: Model<WalletModel>,
    ) {
    }

    async addWallet(userId: string, wallet: Wallet) : Promise<WalletModel | null> {
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
    }

    async getAllWallets(userId: string) : Promise<Array<string> | null> {
        try {
            const currentUser = await this.usersService.getUserById(userId)
            if (!currentUser || !currentUser.walletsId){
                return null
            }
            return currentUser.walletsId
        }catch (e) {
            console.log(e)
        }
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

    async deleteWallet(walletId: string, userId : string): Promise<WalletModel | null> {
        const currentUser = await this.usersService.getUserById(userId)
        if (!currentUser || !currentUser.walletsId){
            return null
        }
        const currentWalletId = currentUser.walletsId.find((walletIdItem) => String(walletIdItem) === walletId)
        if (!currentWalletId) {
            return null
        }
        currentUser.walletsId = currentUser.walletsId.filter((walletIdItem) => String(walletIdItem) !== walletId)
        await this.usersService.updateUserById(userId, currentUser)
        return this.walletModel.findByIdAndDelete({_id: currentWalletId});
    }

    async updateWallet({
                           walletId,
                           userId,
                           wallet
                       } : updateWalletDto): Promise<WalletModel | null> {
        try {
            const currentUser = await this.usersService.getUserById(userId)
            if (!currentUser || !currentUser.walletsId){
                return null
            }
            const currentWalletId = currentUser.walletsId.find((walletIdItem) => String(walletIdItem) === walletId)
            if (!currentWalletId) {
                return null
            }
            return this.walletModel.findByIdAndUpdate({_id: currentWalletId}, wallet, {overwrite : false, new: true});
        }catch (e) {
            console.log(e)
        }
    }
}
