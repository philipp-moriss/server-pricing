import {Transform, Type} from "class-transformer";
import {Types} from "mongoose";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class getSpendingDto {
  walletId: string;
  spendingId: string;
}

export class getAllWalletsDto {
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: string;
}

export class getWalletDto {
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: string;
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  walletId: string;
}

export class addWalletDto {
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: string;
  icon: string;
  name: string;
  balance: number;
  currency: string;
}

export class addSpendingDto {
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: string;
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  walletId: string;
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  spendingId: string;
}
