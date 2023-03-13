import {IsNotEmpty} from "class-validator";
import {ICategory} from "../../../../../models/wallet.model";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../../../../common/helpers/handlers/userIdHandler";


export class AddCategorySpendDto {
    @IsNotEmpty()
    categorySpend: ICategory;
}
export class CategorySpendDtoService {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    category: ICategory;
}
