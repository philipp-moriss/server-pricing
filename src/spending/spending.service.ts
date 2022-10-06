import {Injectable} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {AddSpendingDto, DeleteSpendingDto, GetSpendingDto, UpdateSpendingDto} from "./dto/spending.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class SpendingService {

    constructor(
        @InjectModel(SpendingModel.name) private spendingModel: Model<SpendingModel>
    ) {
    }

    async getSpending({spendingId, walletId, userId}: GetSpendingDto): Promise<SpendingModel | null> {
        return this.spendingModel.findById({_id: spendingId, walletId, userId})
    }

    async getSpendingByWalletId({walletId} : Pick<GetSpendingDto, 'walletId'>) : Promise<SpendingModel[] | null> {
        return this.spendingModel.find({walletId})
    }

    async getSpendingByUserId({userId} : Pick<GetSpendingDto, 'userId'>) : Promise<SpendingModel[] | null> {
        return this.spendingModel.find({userId})
    }

    async deleteSpendingByWalletId({walletId} : Pick<GetSpendingDto, 'walletId'>) : Promise<{deletedCount: number} | null> {
        return this.spendingModel.deleteMany({walletId})
    }

    async deleteSpendingByUserId({userId} : Pick<GetSpendingDto, 'userId'>) : Promise<{deletedCount: number} | null> {
        return this.spendingModel.deleteMany({userId})
    }

    async updateSpending({spending, userId, walletId}: UpdateSpendingDto): Promise<SpendingModel | null> {
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

    async addSpending({walletId, userId, spending}: AddSpendingDto): Promise<SpendingModel | null> {
        return await this.spendingModel.create({...spending, userId, walletId})
    }

    async deleteSpending({walletId, userId, spendingId}: DeleteSpendingDto): Promise<SpendingModel | null> {
        return this.spendingModel.findOneAndDelete({_id: spendingId, walletId, userId});
    }
}
