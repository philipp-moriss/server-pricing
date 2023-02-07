import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../../../common/helpers/handlers/userIdHandler";
import {Prop} from "@nestjs/mongoose";


export class SpendingWalletIdDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    spendingId : string;
}

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
    walletName: string;
    currency: string;
    @Prop({
        type: () => Date,
        nullable: false,
    })
    date: Date
}

export class SpendingDtoService {
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


export class SpendingDtoWithSpendingService {
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
    walletId : string;

    spending : Spending;
}
