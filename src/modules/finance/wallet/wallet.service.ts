import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {updateWalletBalanceDto, updateWalletDto, Wallet} from "./dto/wallet.dto";
import {WalletModel} from "../../../models/wallet.model";


@Injectable()
export class WalletService {

    constructor(
        @InjectModel(WalletModel.name) private walletModel: Model<WalletModel>,
    ) {
    }

    async getAllWallets(userId: string): Promise<Array<WalletModel> | null> {
        const wallets = await this.walletModel.find({userId: userId})
        return wallets
    }

    async getWallet(walletId: string, userId: string): Promise<WalletModel | null> {
        const currentWallet = await this.walletModel.findById({_id: walletId});
        if (!currentWallet) {
            return null
        }
        if (currentWallet.userId.toString() !== userId) {
            return null
        }
        return currentWallet;
    }

    async addWallet(userId: string, wallet: Wallet): Promise<WalletModel | null> {
        const newWallet = new this.walletModel({...wallet, userId})
        if (!newWallet) {
            return null
        }
        await newWallet.save()
        return newWallet
    }

    async updateWallet({
                           walletId,
                           wallet
                       }: updateWalletDto): Promise<WalletModel | null> {
        return this.walletModel.findByIdAndUpdate({_id: walletId}, wallet, {overwrite: false, new: true});
    }

    //:TODO fix this shit
    async updateBalanceWallet({
                                  walletId,
                                  balance
                              }: updateWalletBalanceDto) {
        const wallet = await this.walletModel.findById({_id: walletId});
        if (!wallet) {
            return null
        }
        wallet.balance = balance
        return  wallet.save()
    }

    async deleteWallet(walletId: string, userId: string): Promise<WalletModel | null> {
        const currentWallet = await this.walletModel.findById({_id: walletId});
        if (!currentWallet) {
            return null
        }
        if (currentWallet.userId.toString() !== userId) {
            return null
        }
        return this.walletModel.findByIdAndDelete({_id: currentWallet._id});
    }

    async deleteWallets(userId: string): Promise<{ deletedCount: number; } | null> {
       return this.walletModel.deleteMany({userId: userId});
    }
}
