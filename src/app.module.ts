import {Global, Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {JWTService} from "./authentication/services/jwt.service";
import {MongooseModule} from "@nestjs/mongoose";
import {getMongoConfig} from "./configs/mongo.config";
import {AuthModule} from "./authentication/auth.module";
import {UserModule} from "./modules/user/user.module";
import {FinanceModule} from "./modules/finance/financeModule";



@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        JwtModule,
        FinanceModule,
        AuthModule,
        UserModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
         AppService,
         JWTService
    ],
    exports: [
        JwtModule, JWTService
    ],
})
export class AppModule {
}
