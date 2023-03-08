import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ReplenishmentService} from "./replenishment.service";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {User} from "../../../common/decarators/user.decarator";
import {AddReplenishmentDto, DeleteReplenishmentDto, GetReplenishmentDto} from "./dto/replenishment.dto";
import {WalletService} from "../wallet/wallet.service";
import {AuthGuard} from "../../../common/guards/auth.guard";




@Controller('replenishment')
@UseGuards(AuthGuard)
export class ReplenishmentController {

    constructor(
        private walletService: WalletService,
        private replenishmentService: ReplenishmentService,
    ) {}

    @Get()
    getReplenishment(@Query() {walletId, replenishmentId}: GetReplenishmentDto) : Promise<ReplenishmentModel | null> {
        const result = this.replenishmentService.getReplenishmentByWalletId({walletId, replenishmentId})
        return result
    }

    @Post()
    async createReplenishment(@Body() {replenishment, walletId} : AddReplenishmentDto, @User('_id') userId : string) : Promise<ReplenishmentModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }

        const walletCurrency = currentWallet.currency;
        const walletName = currentWallet.name
        const currentReplenishment = await this.replenishmentService.addReplenishment({
            userId,
            walletId,
            replenishment: {...replenishment, currency : walletCurrency, walletName: walletName}
        })
        if (!currentReplenishment) {
            throw new HttpException('replenishment not Create', HttpStatus.BAD_REQUEST);
        }

        const currentBalance = Number(currentWallet.balance) + Number(currentReplenishment.amount)
        const balance = await this.walletService.updateBalanceWallet({walletId, balance: currentBalance})
        if (!balance) {
            throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
        }
        return currentReplenishment
    }

    @Put()
    async updateReplenishment(@Body() {replenishment, walletId} : AddReplenishmentDto, @User('_id') userId : string) :  Promise<ReplenishmentModel | null> {
        const dto = {replenishment, walletId, userId}
        const currentReplenishment = await this.replenishmentService.getReplenishmentByWalletId({
            replenishmentId : dto.replenishment._id,
            walletId : dto.walletId,
        })
        const updateReplenishment = await this.replenishmentService.updateReplenishment(dto)
        if (!updateReplenishment) {
            throw new HttpException('replenishment not Update', HttpStatus.BAD_REQUEST);
        }
        if (currentReplenishment.amount !== updateReplenishment.amount) {
            let currentBalance = 0;
            const currentWallet = await this.walletService.getWallet(dto.walletId, dto.userId)
            if (!currentWallet) {
                throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
            }
            if (currentReplenishment.amount > updateReplenishment.amount){
                const balance = Number(currentReplenishment.amount) - Number(updateReplenishment.amount)
                currentBalance = Number(currentWallet.balance) - Number(balance)
            }
            if (currentReplenishment.amount < updateReplenishment.amount){
                const balance = Number(updateReplenishment.amount) - Number(currentReplenishment.amount)
                currentBalance = Number(currentWallet.balance) + Number(balance)
            }
            const balanceWallet = await this.walletService.updateBalanceWallet({walletId: dto.walletId, balance: currentBalance})
            if (!balanceWallet) {
                throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
            }
        }
        return updateReplenishment
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
