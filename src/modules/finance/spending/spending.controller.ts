import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Query,
    UseGuards,
    Put,
    Post
} from '@nestjs/common';
import {SpendingService} from "./spending.service";
import {AddSpendingDto, SpendingDtoService, SpendingWalletIdDto} from "./dto/spending.dto";
import {SpendingModel} from "../../../models/spending.model";
import {User} from "../../../common/decarators/user.decarator";
import {UpdateSpendingDto} from "../history/dto/history.dto";
import {AuthGuard} from "../../../common/guards/auth.guard";
import {WalletService} from "../wallet/wallet.service";






@Controller('spending')
@UseGuards(AuthGuard)
export class SpendingController {

    constructor(
        private walletService: WalletService,
        private spendingService : SpendingService
    ) {}

    @Get()
    async getSpending(@Query() {spendingId, walletId} : SpendingWalletIdDto, @User('_id') userId : string) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId}
        const spending = await this.spendingService.getSpending(dto)
        if (!spending) {
            throw new HttpException('spending not found', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

    @Post()
    async addSpending(@Body() {spending : spendingDto, walletId} : AddSpendingDto, @User('_id') userId : string) : Promise<SpendingModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }

        const walletCurrency = currentWallet.currency;
        const walletName = currentWallet.name
        const spending = await this.spendingService.addSpending({
            userId,
            walletId,
            spending: {...spendingDto, currency : walletCurrency, walletName: walletName}
        })
        if (!spending) {
            throw new HttpException('spending not Create', HttpStatus.BAD_REQUEST);
        }

        const currentBalance = Number(currentWallet.balance) - Number(spending.amount)
        const balance = await this.walletService.updateBalanceWallet({walletId, balance: currentBalance})
        if (!balance) {
            throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
        }
        return spending
    }


    @Put()
    async updateSpending(@Body() {spending, walletId} : UpdateSpendingDto,@User('_id') userId : string): Promise<SpendingModel | null>  {
        const dto = {spending, walletId, userId}
        const currentSpending = await this.spendingService.getSpending({
            spendingId : dto.spending._id,
            userId : dto.userId,
            walletId : dto.walletId,
        })
        const updateSpending = await this.spendingService.updateSpending(dto)
        if (!updateSpending) {
            throw new HttpException('spending not Update', HttpStatus.BAD_REQUEST);
        }
        if (Number(currentSpending.amount) !== Number(updateSpending.amount)) {
            let currentBalance = 0;
            const currentWallet = await this.walletService.getWallet(dto.walletId, dto.userId)
            if (!currentWallet) {
                throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
            }
            if (Number(currentSpending.amount) > Number(updateSpending.amount)){
                const balance = Number(currentSpending.amount) - Number(updateSpending.amount)
                currentBalance = Number(currentWallet.balance) + Number(balance)
            }
            if (Number(currentSpending.amount) < Number(updateSpending.amount)){
                const balance = Number(updateSpending.amount) - Number(currentSpending.amount)
                currentBalance = Number(currentWallet.balance) - Number(balance)
            }
            const balanceWallet = await this.walletService.updateBalanceWallet({walletId: dto.walletId, balance: currentBalance})
            if (!balanceWallet) {
                throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
            }
        }
        return updateSpending
    }

    @Delete()
    async deleteSpending(@Body() {spendingId, walletId} : SpendingWalletIdDto,@User('_id') userId : string) : Promise<SpendingModel | null> {
        const dto : SpendingDtoService = {spendingId, walletId, userId}
        const spending = await this.spendingService.deleteSpending(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }

}
