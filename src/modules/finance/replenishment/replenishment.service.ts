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

    async eventHandler() {
        // const testReplenishment : CreateReplenishmentDto = {
        //     walletId: '63c1002bdbd686a7182681a2',
        //     userId: '63c10012dbd686a718268196',
        //     replenishment: {
        //       amount: 10,
        //       currency: 'USD',
        //       walletName: 'test',
        //       title: 'test',
        //       category: 'asdf',
        //       description: 'test'
        //     },
        // }
        // this.eventEmitter.emit('replenishment_add', testReplenishment)
    }

    // async updateSpending({spending, userId, walletId}: SpendingDtoWithSpendingService): Promise<ReplenishmentModel | null> {
    //     return this.replenishmentModel.findOneAndUpdate(
    //         {
    //             _id: spending._id,
    //             userId,
    //             walletId
    //         }
    //         ,
    //         spending
    //         ,
    //         {
    //             new: true,
    //             overwrite: false
    //         }
    //     );
    // }

    async addReplenishment({walletId, userId, replenishment}: CreateReplenishmentDto): Promise<ReplenishmentModel | null> {
        return await this.replenishmentModel.create({...replenishment, userId, walletId})
    }

    async deleteReplenishment({walletId, userId, spendingId}: DeleteReplenishmentDto): Promise<ReplenishmentModel | null> {
        return  this.replenishmentModel.findOneAndDelete({_id: spendingId, walletId, userId});
    }
}
