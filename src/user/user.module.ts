import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelSchema } from './user';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
  ],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
