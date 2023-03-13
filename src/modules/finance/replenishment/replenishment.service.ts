import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {CreateReplenishmentDto, DeleteReplenishmentDto, GetReplenishmentDto} from "./dto/replenishment.dto";


@Injectable()
export class ReplenishmentService {

    constructor(
        @InjectModel(ReplenishmentModel.name) private replenishmentModel: Model<ReplenishmentModel>,
    ) {
    }

    async getReplenishmentByWalletId({
                                         walletId,
                                         replenishmentId
                                     }: GetReplenishmentDto): Promise<ReplenishmentModel | null> {
        return this.replenishmentModel.findOne({walletId, _id: replenishmentId})
    }

    async getReplenishmentsByWalletId(walletId: string): Promise<ReplenishmentModel[]> {
        return this.replenishmentModel.find({walletId})
    }

    async getReplenishmentsByParameters(params): Promise<ReplenishmentModel[] | null> {
        return this.replenishmentModel.find({
            ...params
        }).sort('date')

    }

    async updateReplenishment({
                                  replenishment,
                                  userId,
                                  walletId
                              }: CreateReplenishmentDto): Promise<ReplenishmentModel | null> {
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

    async addReplenishment({
                               walletId,
                               userId,
                               replenishment
                           }: CreateReplenishmentDto): Promise<ReplenishmentModel | null> {
        return await this.replenishmentModel.create({...replenishment, userId, walletId})
    }

    async deleteReplenishment({
                                  walletId,
                                  userId,
                                  replenishmentId
                              }: DeleteReplenishmentDto): Promise<ReplenishmentModel | null> {
        return this.replenishmentModel.findOneAndDelete({_id: replenishmentId, walletId, userId});
    }
}
