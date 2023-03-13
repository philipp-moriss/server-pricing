import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {Spending} from "../../spending/dto/spending.dto";
import {toMongoObjectId} from "../../../../common/helpers/handlers/userIdHandler";

export class SpendingByUserIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;
}
export class getHistoryByParamsDto {
    dateStart?: number;
    dateEnd?: number;
    selectedCategory: string
    showHistory: 'income' | 'spend';
    sortBy: 'date' | 'sum' | 'categoryName'
    sortDecreasing: 'decreasing' | 'increasing'
    @Transform(toMongoObjectId)
    walletId: string;
}

export class UpdateSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    spending: Spending;
}
