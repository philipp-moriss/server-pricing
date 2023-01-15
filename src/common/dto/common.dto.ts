import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../helpers/handlers/userIdHandler";

export class UserId {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;
}

export class WalletId {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;
}
