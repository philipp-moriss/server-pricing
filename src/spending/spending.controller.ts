import {Body, Controller, Delete, Get, HttpException, HttpStatus, Req, Query, UseGuards} from '@nestjs/common';
import {SpendingModel} from "./spending.model";
import {SpendingService} from "./spending.service";
import {DeleteSpendingDto, GetSpendingDto, SpendingDtoService} from "./dto/spending.dto";
import {AuthGuard} from "../guards/auth.guard";
import {User} from "../decarators/user.decarator";




@Controller('spending')
@UseGuards(AuthGuard)
export class SpendingController {

    constructor(private spendingService : SpendingService) {}

    @Get()
    async getSpending(@Query() {spendingId, walletId} : GetSpendingDto, @User('_id') userId : string) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId}
        const spending = await this.spendingService.getSpending(dto)
        if (!spending) {
            throw new HttpException('spending not found', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

    @Delete()
    async deleteSpending(@Body() {spendingId, walletId} : DeleteSpendingDto,@User('_id') userId : string) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId}
        const spending = await this.spendingService.deleteSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

}
