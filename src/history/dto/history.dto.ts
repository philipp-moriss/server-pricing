import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";
import {Spending} from "../../spending/dto/spending.dto";

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

export class SpendingByWalletIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;
}

