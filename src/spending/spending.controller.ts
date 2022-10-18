import {Body, Controller, Delete, Get, HttpException, HttpStatus, Req, Query, UseGuards} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {SpendingService} from "./spending.service";
import {DeleteSpendingDto, GetSpendingDto, SpendingDtoService} from "./dto/spending.dto";
import {AuthGuard} from "../guards/auth.guard";
import {Request} from 'express'




@Controller('spending')
@UseGuards(AuthGuard)
export class SpendingController {

    constructor(private spendingService : SpendingService) {}

    @Get()
    async getSpending(@Query() {spendingId, walletId} : GetSpendingDto, @Req() req : Request) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId : req.user._id}
        const spending = await this.spendingService.getSpending(dto)
        if (!spending) {
            throw new HttpException('spending not found', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

    @Delete()
    async deleteSpending(@Body() {spendingId, walletId} : DeleteSpendingDto, @Req() req : Request) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId : req.user._id}
        const spending = await this.spendingService.deleteSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

}
