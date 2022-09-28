import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {SpendingService} from "./spending.service";
import {DeleteSpendingDto, GetSpendingDto} from "./dto/spending.dto";

@Controller('spending')
export class SpendingController {

    constructor(private spendingService : SpendingService) {}

    @Get()
    async getSpending(@Query() dto : GetSpendingDto) : Promise<SpendingModel | null> {
        const spending = await this.spendingService.getSpending(dto)
        if (!spending) {
            throw new HttpException('spending not found', HttpStatus.BAD_REQUEST);
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
