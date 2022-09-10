import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {SpendingService} from "./spending.service";
import {AddSpendingDto, DeleteSpendingDto, GetSpendingDto, UpdateSpendingDto} from "./dto/spending.dto";

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

    @Put()
    async updateSpending(@Body() dto : UpdateSpendingDto): Promise<SpendingModel | null>  {
        const updateSpending = await this.spendingService.updateSpending(dto)
        if (!updateSpending) {
            throw new HttpException('spending not Update', HttpStatus.BAD_REQUEST);
        }
        return updateSpending
    }

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
