import {Module} from '@nestjs/common';
import {WalletController} from './wallet.controller';
import {WalletService} from './wallet.service';
import {MongooseModule} from "@nestjs/mongoose";
import {WalletModel, WalletModelSchema} from "./wallet.model";
import {UsersService} from "../user/users.service";
import {UserModel, UserModelSchema} from "../user/user.model";

@Module({
    controllers: [WalletController],
    providers: [WalletService, UsersService],
    imports: [
        MongooseModule.forFeature([
            {name: WalletModel.name, schema: WalletModelSchema},
            {name: UserModel.name, schema: UserModelSchema},
        ])
    ],
    exports: [WalletService, UsersService],
})
export class WalletModule {
}
