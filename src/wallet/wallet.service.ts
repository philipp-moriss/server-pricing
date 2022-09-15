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
            currentUser.wallets.push(newWallet)
            const updateUser = await this.usersService.updateUserById(userId, currentUser)
            if (!updateUser) {
                return null
            }
            return newWallet
    }

    async getAllWallets(userId: string) : Promise<Array<WalletModel> | null> {
            const currentUser = await this.usersService.getUserById(userId)
            if (!currentUser || !currentUser.wallets){
                return null
            }
            return currentUser.wallets
    }

    async getWallet(walletId: string, userId : string): Promise<WalletModel | null> {
        const currentUser = await this.usersService.getUserById(userId)
        if (!currentUser || !currentUser.wallets){
            return null
        }
        const currentWallet = currentUser.wallets.find((walletIdItem) => walletIdItem._id.toString() === walletId)
        if (!currentWallet) {
            return null
        }
        return this.walletModel.findById({_id: currentWallet._id});
    }

    async deleteWallet(walletId: string, userId : string): Promise<WalletModel | null> {
        const currentUser = await this.usersService.getUserById(userId)
        if (!currentUser || !currentUser.wallets){
            return null
        }
        const currentWallet = currentUser.wallets.find((walletIdItem) => String(walletIdItem._id) === walletId)
        if (!currentWallet) {
            return null
        }
        currentUser.wallets = currentUser.wallets.filter((walletIdItem) => String(walletIdItem._id) !== walletId)
        await this.usersService.updateUserById(userId, currentUser)
        return this.walletModel.findByIdAndDelete({_id: currentWallet._id});
    }

    async updateWallet({
                           walletId,
                           userId,
                           wallet
                       } : updateWalletDto): Promise<WalletModel | null> {
        try {
            const currentUser = await this.usersService.getUserById(userId)
            if (!currentUser || !currentUser.wallets){
                return null
            }
            const currentWallet = currentUser.wallets.find((walletIdItem) => String(walletIdItem._id) === walletId)
            if (!currentWallet) {
                return null
            }
            currentUser.wallets = currentUser.wallets.map((_wallet) => {
                if (_wallet._id.toString() === walletId) {
                    const newWalletMap : WalletModel = Object.assign(_wallet, wallet)
                    return newWalletMap
                }
                return _wallet
            })
            await this.usersService.updateUserById(currentUser._id, currentUser)
            return this.walletModel.findByIdAndUpdate({_id: currentWallet._id}, wallet, {overwrite : false, new: true});
        }catch (e) {
            console.log(e)
        }
    }
}
