import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingRouteController } from './testing-route/testing-route.controller';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { SpendingModule } from './spending/spending.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [WalletModule, AuthModule, SpendingModule, UserModule],
  controllers: [AppController, TestingRouteController],
  providers: [AppService],
})
export class AppModule {}
