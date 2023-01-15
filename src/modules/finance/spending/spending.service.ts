import {Injectable} from '@nestjs/common';
import {
    SpendingDtoService,
    SpendingDtoWithSpendingService,
} from "./dto/spending.dto";
import {InjectModel} from "@nestjs/mongoose";
import {SpendingModel} from "../../../models/spending.model";
import {UserId, WalletId} from "../../../common/dto/common.dto";
import {Model} from "mongoose";


@Injectable()
export class SpendingService {

    constructor(
        @InjectModel(SpendingModel.name) private spendingModel: Model<SpendingModel>
    ) {
    }

    async getSpending({spendingId, walletId, userId}: SpendingDtoService): Promise<SpendingModel | null> {
        return this.spendingModel.findById({_id: spendingId, walletId, userId})
    }

    async getSpendingByWalletId({walletId} : WalletId) : Promise<SpendingModel[] | null> {
        return this.spendingModel.find({walletId})
    }

    async getSpendingByUserId({userId} : UserId) : Promise<SpendingModel[] | null> {
        return this.spendingModel.find({userId})
    }

    async getSpendingByParameters(params) : Promise<SpendingModel[] | null> {
        return this.spendingModel.find({
            ...params
        })
    }

    async deleteSpendingByWalletId({walletId} : WalletId) : Promise<{deletedCount: number} | null> {
        return this.spendingModel.deleteMany({walletId})
    }

    async deleteSpendingByUserId({userId} : UserId) : Promise<{deletedCount: number} | null> {
        return this.spendingModel.deleteMany({userId})
    }

    async updateSpending({spending, userId, walletId}: SpendingDtoWithSpendingService): Promise<SpendingModel | null> {
        return this.spendingModel.findOneAndUpdate(
            {
                _id: spending._id,
                userId,
                walletId
            }
            ,
            spending
            ,
            {
                new: true,
                overwrite: false
            }
        );
    }

    async addSpending({walletId, userId, spending}: SpendingDtoWithSpendingService): Promise<SpendingModel | null> {
        return await this.spendingModel.create({...spending, userId, walletId})
    }

    async deleteSpending({walletId, userId, spendingId}: SpendingDtoService): Promise<SpendingModel | null> {
        return this.spendingModel.findOneAndDelete({_id: spendingId, walletId, userId});
    }
}
