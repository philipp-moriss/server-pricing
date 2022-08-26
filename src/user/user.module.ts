import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
  controllers: [UserController],
  imports: [UserModel],
})
export class UserModule {}
