import {IsNotEmpty} from "class-validator";
import {ICategory} from "../../../../../models/wallet.model";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../../../../common/helpers/handlers/userIdHandler";


export class AddCategoryIncomeDto {
    categoryIncome: ICategory;
}
export class CategoryIncomeDtoService {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;
    @IsNotEmpty()
    category: ICategory;
}
