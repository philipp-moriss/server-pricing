import {Global, Module} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WalletModule } from "./wallet/wallet.module";
import { UserModule } from "./user/user.module";
import { SpendingModule } from "./spending/spending.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./configs/mongo.config";
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';
import {JWTService} from "./auth/services/jwt.service";
import {JwtModule} from "@nestjs/jwt";

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
    WalletModule,
    AuthModule,
    SpendingModule,
    UserModule,
    HistoryModule,
  ],
  controllers: [AppController, HistoryController],
  providers: [AppService, JWTService],
  exports: [JwtModule, JWTService],
})
export class AppModule {
}
