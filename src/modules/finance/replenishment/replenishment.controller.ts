import {Controller, Get} from '@nestjs/common';
import {ReplenishmentService} from "./replenishment.service";

@Controller('replenishment')
export class ReplenishmentController {

    constructor(
        private replenishmentService: ReplenishmentService,
    ) {}

    @Get()
    getReplenishment() {
        this.replenishmentService.eventHandler()
        return 'asdfsdf'
    }
    // getReplenishment(@Query() {walletId}: WalletId) : Promise<ReplenishmentModel[] | null> {
    //     const result = this.replenishmentService.getReplenishmentByWalletId({walletId: walletId})
    //     return result
    // }


}
