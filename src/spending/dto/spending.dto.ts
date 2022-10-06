import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class Spending {
    @Transform(toMongoObjectId)
    _id : string;
    @IsNotEmpty()
    title: string;
    description: string;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    amount: number;
    currency: string;
}

export class GetSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    spendingId : string;
}

export class UpdateSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    spending: Spending;
}

export class AddSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    spending : Spending;
}


export class DeleteSpendingDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    spendingId : string;
}

