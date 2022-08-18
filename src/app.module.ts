import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { SpendingModule } from './spending/spending.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WalletModule, AuthModule, SpendingModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
