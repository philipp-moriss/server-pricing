import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CategoryIncomeModel} from "../../../../models/categoryIncome.model";
import {CategorySpendDtoService} from "./dto/categoryIncome.dto";
import {CategorySpendModel} from "../../../../models/categorySpend.model";
import {ICategory} from "../../../../models/wallet.model";

@Injectable()
export class CategorySpendService {

    constructor(
        @InjectModel(CategorySpendModel.name) private categorySpendModel: Model<CategorySpendModel>
    ) {
    }

    async findCategorySpends(nameCategory: string, userId: string): Promise<ICategory | null> {
        return this.categorySpendModel.findOne({value: nameCategory, userId, operation: 'spend'});
    }

    async addCategory({userId, category}: CategorySpendDtoService): Promise<CategorySpendModel | null> {
        return await this.categorySpendModel.create({...category, userId})
    }

    async getCategories(params): Promise<CategoryIncomeModel[] | null> {
        return this.categorySpendModel.find({...params});
    }
}
