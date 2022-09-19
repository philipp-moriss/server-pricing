import { Module } from "@nestjs/common";
import { SpendingController } from "./spending.controller";
import { WalletService } from "../wallet/wallet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { WalletModel, WalletModelSchema } from "../wallet/wallet.model";
import { UserModel, UserModelSchema } from "../user/user.model";
import { SpendingModel, SpendingModelSchema } from "./spending.model";
import { SpendingService } from "./spending.service";

@Module({
  controllers: [SpendingController],
  providers: [WalletService, SpendingService],
  imports: [
    MongooseModule.forFeature([
      {name: WalletModel.name, schema: WalletModelSchema},
      {name: UserModel.name, schema: UserModelSchema},
      {name: SpendingModel.name, schema: SpendingModelSchema},
    ])
  ],
  exports: [WalletService, SpendingService],
})
export class SpendingModule {}
