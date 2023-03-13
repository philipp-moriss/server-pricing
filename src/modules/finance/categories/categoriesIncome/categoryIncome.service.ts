import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CategoryIncomeModel} from "../../../../models/categoryIncome.model";
import {CategoryIncomeDtoService} from "./dto/categoryIncome.dto";
import {ICategory} from "../../../../models/wallet.model";
import {SpendingModel} from "../../../../models/spending.model";
import {v1} from "uuid";


@Injectable()
export class CategoryIncomeService {

    constructor(
        @InjectModel(CategoryIncomeModel.name) private categoryModel: Model<CategoryIncomeModel>
    ) {
    }
    async findCategoryIncome(nameCategory: string, userId: string): Promise<ICategory | null> {
        return this.categoryModel.findOne({value: nameCategory, userId, operation: 'income'});
    }
    async addCategory({userId, category}: CategoryIncomeDtoService): Promise<CategoryIncomeModel | null> {
        return await this.categoryModel.create({...category, userId})
    }

    async getCategories(params): Promise<CategoryIncomeModel[] | null> {
        return this.categoryModel.find({...params});
    }
}
