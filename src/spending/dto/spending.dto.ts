import {IsNotEmpty} from "class-validator";
import {Transform, Type} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class Spending {
    @IsNotEmpty()
    title: string;
    description: string;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    amount: number;
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

