import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserModelSchema } from "./user.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../auth/services/auth.service";
import { AuthModelService } from "../auth/services/auth-model.service";
import { AuthTokenModel, AuthTokenModelSchema } from "../auth/models/auth-token.model";
import { UserPassModel, UserPassSchema } from "../auth/models/user-pass.model";
import { UserPassService } from "../auth/services/user-pass.service";

@Module({
  controllers: [UserController],
  providers: [UsersService, AuthService, AuthModelService, UserPassService],
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema },
      { name: AuthTokenModel.name, schema: AuthTokenModelSchema },
      { name: UserPassModel.name, schema: UserPassSchema }
    ])
  ],
  exports: [UsersService]
})
export class UserModule {
}
