import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../../../common/helpers/handlers/userIdHandler";
import {Prop} from "@nestjs/mongoose";


class Replenishment {
    @Transform(toMongoObjectId)
    _id?: string;
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
export class GetReplenishmentDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    replenishmentId : string;
}

export class CreateReplenishmentDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    replenishment: Replenishment;
}

export class AddReplenishmentDto {

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    replenishment: Replenishment;
}



export class DeleteReplenishmentDto {
    @IsNotEmpty()
    @Transform(toMongoObjectId)
    userId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    walletId : string;

    @IsNotEmpty()
    @Transform(toMongoObjectId)
    replenishmentId : string;
}
