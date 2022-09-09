import {Transform, Type} from "class-transformer";
import {Types} from "mongoose";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";
import {WalletModel} from "../wallet.model";
import {Prop} from "@nestjs/mongoose";
import {IsNotEmpty} from "class-validator";

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


export class deleteWalletDto {
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
  @IsNotEmpty()
  userId: string;
  wallet : Wallet;
}


export class updateWalletDto {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  userId: string;
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  walletId: string;
  wallet : Wallet;
}


export class Wallet {
  @IsNotEmpty()
  @Type(() => String)
  icon: string;
  @IsNotEmpty()
  @Type(() => String)
  name: string;
  @IsNotEmpty()
  @Type(() => Number)
  balance: number;
  @IsNotEmpty()
  @Type(() => String)
  currency: string;
}
