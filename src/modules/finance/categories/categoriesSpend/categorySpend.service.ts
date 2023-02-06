import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CategoryIncomeModel} from "../../../../models/categoryIncome.model";
import {ICategory} from "../../../../models/wallet.model";
import {CategorySpendDtoService} from "./dto/categoryIncome.dto";
import {CategorySpendModel} from "../../../../models/categorySpend.model";


@Injectable()
export class CategorySpendService {

    constructor(
        @InjectModel(CategorySpendModel.name) private categorySpendModel: Model<CategorySpendModel>
    ) {
    }

    async findCategoryIncome(nameCategory: string): Promise<ICategory | null> {
        return this.categorySpendModel.findOne({value: nameCategory});
    }

    async addCategory({userId, category}: CategorySpendDtoService): Promise<ICategory | null> {
        return await this.categorySpendModel.create({...category, userId})
    }

    async getCategories(params): Promise<CategoryIncomeModel[] | null> {
        return this.categorySpendModel.find({...params});
    }
}
