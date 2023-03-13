import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, UseGuards} from '@nestjs/common';
import {WalletService} from "../../wallet/wallet.service";
import {SpendingService} from "../../spending/spending.service";
import {SpendingModel} from "../../../../models/spending.model";
import {User} from "../../../../common/decarators/user.decarator";
import {UserId, WalletId} from "../../../../common/dto/common.dto";
import {AuthGuard} from "../../../../common/guards/auth.guard";
import {ReplenishmentService} from "../../replenishment/replenishment.service";
import {AddCategoryIncomeDto} from "./dto/categoryIncome.dto";
import {CategoryIncomeService} from "./categoryIncome.service";
import {CategoryIncomeModel} from "../../../../models/categoryIncome.model";
import {ICategory} from "../../../../models/wallet.model";


@Controller('categories-income')
@UseGuards(AuthGuard)
export class CategoryIncomeController {

    constructor(
        private categoryIncomeService: CategoryIncomeService,
    ) {
    }


    @Post()
    async addCategoryIncome(@Body() {categoryIncome}: AddCategoryIncomeDto, @User('_id') userId: string): Promise<ICategory | null>  {
        const checkCategory = await this.categoryIncomeService.findCategoryIncome(categoryIncome.value, userId)
        if(checkCategory){
            throw new HttpException('Категория уже существует', HttpStatus.BAD_REQUEST);
        }
        const category = await this.categoryIncomeService.addCategory({category: categoryIncome, userId: userId})

        if (!category) {
            throw new HttpException('Ошибка, попробуйте позже', HttpStatus.BAD_REQUEST);
        }
        return category
    }

    @Get()
    async getCategoriesIncome(@User('_id') userId: string): Promise<CategoryIncomeModel[] | null> {
        const category = await this.categoryIncomeService.getCategories({userId, operation: 'income'})
        if (!category) {
            throw new HttpException('Ошибка, попробуйте позже', HttpStatus.BAD_REQUEST);
        }
        return category
    }
}
