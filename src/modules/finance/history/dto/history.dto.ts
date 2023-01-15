import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {Spending} from "../../spending/dto/spending.dto";
import {toMongoObjectId} from "../../../../common/helpers/handlers/userIdHandler";

export class SpendingByUserIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;
}

export class UpdateSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    spending: Spending;
}
