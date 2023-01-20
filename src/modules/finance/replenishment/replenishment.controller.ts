import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {ReplenishmentService} from "./replenishment.service";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {WalletId} from "../../../common/dto/common.dto";
import {User} from "../../../common/decarators/user.decarator";
import {DeleteReplenishmentDto} from "./dto/replenishment.dto";

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
    async deleteReplenishment(@Body() {replenishmentId, walletId} : DeleteReplenishmentDto,@User('_id') userId : string) : Promise<ReplenishmentModel | null> {
        const dto : DeleteReplenishmentDto = {replenishmentId, walletId, userId}
        const spending = await this.replenishmentService.deleteReplenishment(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }
}
