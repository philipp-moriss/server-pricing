import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WalletModule } from "./wallet/wallet.module";
import { UserModule } from "./user/user.module";
import { SpendingModule } from "./spending/spending.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./configs/mongo.config";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    WalletModule,
    AuthModule,
    SpendingModule,
    UserModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
