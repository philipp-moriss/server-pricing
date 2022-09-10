import {Body, Controller, Delete, HttpException, HttpStatus, Post} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {SpendingService} from "./spending.service";
import {AddSpendingDto, DeleteSpendingDto} from "./dto/spending.dto";

@Controller('spending')
export class SpendingController {

    constructor(private spendingService : SpendingService) {}

    @Post()
    async addSpending(@Body() dto : AddSpendingDto) : Promise<SpendingModel | null> {
        const spending = await this.spendingService.addSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Create', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

    @Delete()
    async deleteSpending(@Body() dto : DeleteSpendingDto) : Promise<SpendingModel | null> {
        const spending = await this.spendingService.deleteSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

}
