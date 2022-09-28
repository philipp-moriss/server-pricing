import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class SpendingByUserIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;
}

export class SpendingByWalletIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;
}

