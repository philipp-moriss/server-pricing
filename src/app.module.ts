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
import { ChartController } from './chart/chart.controller';
import { ChartModule } from './chart/chart.module';
import {WalletController} from "./wallet/wallet.controller";
import {SpendingController} from "./spending/spending.controller";
import {ChartService} from "./chart/chart.service";

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
    ChartModule,
  ],
  controllers: [
      AppController,
      HistoryController,
      ChartController,
      WalletController,
      SpendingController,
      ChartController
  ],
  providers: [AppService, JWTService],
  exports: [JwtModule, JWTService],
})
export class AppModule {
}
