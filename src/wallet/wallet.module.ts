import { Module } from "@nestjs/common";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { WalletModel, WalletModelSchema } from "./wallet.model";
import { UserModel, UserModelSchema } from "../user/user.model";

@Module({
    controllers: [WalletController],
    providers: [WalletService],
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
            {name: UserModel.name, schema: UserModelSchema},
        ])
    ],
    exports: [WalletService],
})
export class WalletModule {
}
