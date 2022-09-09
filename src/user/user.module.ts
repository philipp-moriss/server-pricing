import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserModelSchema } from "./user.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema }
    ])
  ],
  exports: [UsersService]
})
export class UserModule {
}
