import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CategoryIncomeModel} from "../../../../models/categoryIncome.model";
import {CategoryIncomeDtoService} from "./dto/categoryIncome.dto";
import {ICategory} from "../../../../models/wallet.model";
import {SpendingModel} from "../../../../models/spending.model";


@Injectable()
export class CategoryIncomeService {

    constructor(
        @InjectModel(CategoryIncomeModel.name) private categoryModel: Model<CategoryIncomeModel>
    ) {
    }
    async findCategoryIncome(nameCategory: string): Promise<ICategory | null> {
        return this.categoryModel.findOne({value: nameCategory});
    }
    async addCategory({userId, category}: CategoryIncomeDtoService): Promise<ICategory | null> {
        return await this.categoryModel.create({...category, userId})
    }

    async getCategories(params): Promise<CategoryIncomeModel[] | null> {
        return this.categoryModel.find({...params});
    }
}
