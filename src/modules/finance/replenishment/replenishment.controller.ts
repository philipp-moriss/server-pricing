import {Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {ReplenishmentService} from "./replenishment.service";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {WalletId} from "../../../common/dto/common.dto";

@Controller('replenishment')
export class ReplenishmentController {

    constructor(
        private replenishmentService: ReplenishmentService,
    ) {}

    @Get()
    getReplenishment(@Query() {walletId}: WalletId) : Promise<ReplenishmentModel[] | null> {
        const result = this.replenishmentService.getReplenishmentByWalletId({walletId: walletId})
        return result
    }

    @Post()
    createReplenishment() {
        return {
            status: 'create'
        }
    }

    @Put()
    updateReplenishment() {
        return 'update'
    }

    @Delete()
    deleteReplenishment() {
        return 'delete'
    }
}
