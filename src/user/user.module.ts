import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserModelSchema } from "./user.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { AuthModelService } from "../auth/auth-model.service";
import { AuthTokenModel, AuthTokenModelSchema } from "../auth/auth-token.model";

@Module({
  controllers: [UserController],
  providers: [UsersService, AuthService, AuthModelService],
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema }
    ]),
    MongooseModule.forFeature([
      { name: AuthTokenModel.name, schema: AuthTokenModelSchema }
    ])
  ],
  exports: [UsersService]
})
export class UserModule {
}
