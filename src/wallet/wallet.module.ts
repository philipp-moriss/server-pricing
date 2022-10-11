import { Module } from "@nestjs/common";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { WalletModel, WalletModelSchema } from "./wallet.model";

@Module({
    controllers: [WalletController],
    providers: [WalletService],
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
        ])
    ],
    exports: [WalletService],
})
export class WalletModule {
}
