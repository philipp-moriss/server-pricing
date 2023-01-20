import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {CreateReplenishmentDto, DeleteReplenishmentDto} from "./dto/replenishment.dto";
import {WalletId} from "../../../common/dto/common.dto";


@Injectable()
export class ReplenishmentService {

    constructor(
        @InjectModel(ReplenishmentModel.name) private replenishmentModel: Model<ReplenishmentModel>,
    ) {
    }

    async getReplenishmentByWalletId({walletId} : WalletId) : Promise<ReplenishmentModel[] | null> {
        return this.replenishmentModel.find({walletId})
    }

    async updateReplenishment({replenishment, userId, walletId}: CreateReplenishmentDto): Promise<ReplenishmentModel | null> {
        return this.replenishmentModel.findOneAndUpdate(
            {
                _id: replenishment._id,
                userId,
                walletId
            }
            ,
            replenishment
            ,
            {
                new: true,
                overwrite: false
            }
        );
    }

    async addReplenishment({walletId, userId, replenishment}: CreateReplenishmentDto): Promise<ReplenishmentModel | null> {
        return await this.replenishmentModel.create({...replenishment, userId, walletId})
    }

    async deleteReplenishment({walletId, userId, replenishmentId}: DeleteReplenishmentDto): Promise<ReplenishmentModel | null> {
        return this.replenishmentModel.findOneAndDelete({_id: replenishmentId, walletId, userId});
    }
}
