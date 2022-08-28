import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    MongooseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
