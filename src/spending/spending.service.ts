import {Injectable} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {AddSpendingDto, DeleteSpendingDto, GetSpendingDto, UpdateSpendingDto} from "./dto/spending.dto";
// import {WalletService} from "../wallet/wallet.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class SpendingService {

    constructor(
        // private walletService: WalletService,
        @InjectModel(SpendingModel.name) private spendingModel: Model<SpendingModel>
    ) {
    }

    async getSpending({spendingId, walletId, userId}: GetSpendingDto): Promise<SpendingModel | null> {
        // const currentWallet = await this.walletService.getWallet(walletId, userId)
        // if (!currentWallet) {
        //     return null
        // }
        // const currentSpending = currentWallet.history.find((spending) => String(spending._id) === spendingId)
        // if (!currentSpending) {
        //     return null
        // }
        const spending = await this.spendingModel.findById({_id: spendingId, walletId, userId})
        return spending
    }

    async updateSpending({spending, userId, walletId}: UpdateSpendingDto): Promise<SpendingModel | null> {
        // const currentSpending = await this.getSpending({spendingId: spending._id, userId, walletId})
        // if (!currentSpending) {
        //     return null
        // }
        const newSpending = await this.spendingModel.findOneAndUpdate({_id: spending._id, userId, walletId}, spending, {new : true, overwrite: false});
        // const currentWallet = await this.walletService.getWallet(walletId, userId)
        // currentWallet.history = currentWallet.history.map((spending) => {
        //     if (spending._id.toString() === newSpending._id.toString()) {
        //         return newSpending
        //     }else return spending
        // })
        // const isSave = await currentWallet.save()
        // if (!isSave) {
        //     return null
        // }
        return newSpending
    }

    async addSpending({walletId, userId, spending}: AddSpendingDto): Promise<SpendingModel | null> {
        // const currentWallet = await this.walletService.getWallet(walletId, userId)
        // if (!currentWallet) {
        //     return null
        // }
        const newSpending = await this.spendingModel.create({...spending, userId, walletId})
        if (!newSpending) {
            return null
        }
        return newSpending
        // currentWallet.history.push(newSpending)
        // currentWallet.balance = currentWallet.balance - newSpending.amount
        // const newWallet = await this.walletService.updateWallet({walletId, userId, wallet: currentWallet})
        // if (!newWallet) {
        //     return null
        // }
        // return newSpending
    }

    async deleteSpending({walletId, userId, spendingId}: DeleteSpendingDto): Promise<SpendingModel | null> {
        // const currentWallet = await this.walletService.getWallet(walletId, userId)
        // if (!currentWallet) {
        //     return null
        // }
        // const currentSpending = currentWallet.history.find((spending) => String(spending._id) === spendingId)
        // if (!currentSpending) {
        //     return null
        // }
        // currentWallet.history = currentWallet.history.filter((spending) => String(spending._id) !== spendingId)
        // const newWallet = await this.walletService.updateWallet({walletId, userId, wallet: currentWallet})
        const deleteSpending = await this.spendingModel.findOneAndDelete({_id: spendingId, walletId, userId})
        // if (!newWallet) {
        //     return null
        // }
        return deleteSpending
    }
}
