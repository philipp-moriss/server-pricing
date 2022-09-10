import { Injectable } from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {AddSpendingDto, DeleteSpendingDto} from "./dto/spending.dto";
import {WalletService} from "../wallet/wallet.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsersService} from "../user/users.service";

@Injectable()
export class SpendingService {

    constructor(
        private usersService: UsersService,
        private walletService: WalletService,
        @InjectModel(SpendingModel.name) private spendingModel: Model<SpendingModel>
    ) {
    }

    async addSpending ({walletId, userId, spending} : AddSpendingDto) : Promise<SpendingModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet){
            return null
        }
        const newSpending = await this.spendingModel.create({...spending})
        if (!newSpending) {
            return null
        }
        currentWallet.history.push(newSpending)
        const newWallet = await this.walletService.updateWallet({walletId, userId, wallet: currentWallet})
        if (!newWallet){
            return null
        }
        return newSpending
    }

    async deleteSpending ({walletId, userId, spendingId} : DeleteSpendingDto) : Promise<SpendingModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet){
            return null
        }
        const currentSpending = currentWallet.history.find((spending) => String(spending._id) === spendingId)
        if (!currentSpending){
            return null
        }
        currentWallet.history = currentWallet.history.filter((spending) => String(spending._id) !== spendingId)
        const newWallet = await this.walletService.updateWallet({walletId, userId, wallet: currentWallet})
        const deleteSpending = await this.spendingModel.findByIdAndDelete({_id: spendingId})
        if (!newWallet){
            return null
        }
        return deleteSpending
    }
}
