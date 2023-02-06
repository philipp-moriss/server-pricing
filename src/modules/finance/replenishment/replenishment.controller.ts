import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ReplenishmentService} from "./replenishment.service";
import {ReplenishmentModel} from "../../../models/replenishment.model";
import {User} from "../../../common/decarators/user.decarator";
import {AddReplenishmentDto, DeleteReplenishmentDto, GetReplenishmentDto} from "./dto/replenishment.dto";
import {WalletService} from "../wallet/wallet.service";
import {AuthGuard} from "../../../common/guards/auth.guard";
import {ICategory} from "../../../models/wallet.model";
import {UserPassService} from "../../../authentication/services/user-pass.service";


@Controller('replenishment')
@UseGuards(AuthGuard)
export class ReplenishmentController {

    constructor(
        private walletService: WalletService,
        private replenishmentService: ReplenishmentService,
    ) {
    }

    @Get()
    getReplenishments(@Query() {walletId}: GetReplenishmentDto): Promise<ReplenishmentModel[] | null> {
        const result = this.replenishmentService.getReplenishmentsByWalletId(walletId)
        if (!result) {
            throw new HttpException('replenishment is empty', HttpStatus.BAD_REQUEST);
        }
        return result
    }

    @Post()
    async createReplenishment(@Body() {
        replenishment,
        walletId
    }: AddReplenishmentDto, @User('_id') userId: string): Promise<ReplenishmentModel | null> {
        const currentWallet = await this.walletService.getWallet(walletId, userId)
        if (!currentWallet) {
            throw new HttpException('walletId not correct', HttpStatus.BAD_REQUEST);
        }

        const walletCurrency = currentWallet.currency;
        const walletName = currentWallet.name
        const currentReplenishment = await this.replenishmentService.addReplenishment({
            userId,
            walletId,
            replenishment: {...replenishment, currency: walletCurrency, walletName: walletName}
        })
        if (!currentReplenishment) {
            throw new HttpException('replenishment not Create', HttpStatus.BAD_REQUEST);
        }
        const totalIncome = Math.round(Number(currentWallet?.totalIncome ?? 0) + Number(replenishment.amount))
        const currentBalance = Math.round(Number(currentWallet?.balance ?? 0) + Number(replenishment.amount))
        const balance = await this.walletService.updateBalanceWallet({walletId, balance: currentBalance, totalIncome: totalIncome})
        if (!balance) {
            throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
        }
        return currentReplenishment
    }

    @Put()
    async updateReplenishment(@Body() {
        replenishment,
        walletId
    }: AddReplenishmentDto, @User('_id') userId: string): Promise<ReplenishmentModel | null> {
        const dto = {replenishment, walletId, userId}
        const currentReplenishment = await this.replenishmentService.getReplenishmentByWalletId({
            replenishmentId: dto.replenishment._id,
            walletId: dto.walletId,
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
            if (currentReplenishment.amount > updateReplenishment.amount) {
                const balance = currentReplenishment.amount - updateReplenishment.amount
                currentBalance = currentWallet.balance - balance
            }
            if (currentReplenishment.amount < updateReplenishment.amount) {
                const balance = updateReplenishment.amount - currentReplenishment.amount
                currentBalance = currentWallet.balance + balance
            }
            const balanceWallet = await this.walletService.updateBalanceWallet({
                walletId: dto.walletId,
                balance: currentBalance
            })
            if (!balanceWallet) {
                throw new HttpException('balance not update', HttpStatus.BAD_REQUEST);
            }
        }
        return updateReplenishment
    }

    @Delete()
    async deleteReplenishment(@Body() {
        replenishmentId,
        walletId
    }: DeleteReplenishmentDto, @User('_id') userId: string): Promise<ReplenishmentModel | null> {
        const dto: DeleteReplenishmentDto = {replenishmentId, walletId, userId}
        const spending = await this.replenishmentService.deleteReplenishment(dto)
        if (!spending) {
            throw new HttpException('spending not Delete', HttpStatus.BAD_REQUEST);
        }
        return spending
    }
}
