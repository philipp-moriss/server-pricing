import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";


import { JwtModule } from "@nestjs/jwt";
import {UserModel, UserModelSchema} from "../../models/user.model";
import {AuthTokenModel, AuthTokenModelSchema} from "../../authentication/models/auth-token.model";
import {UserPassModel, UserPassSchema} from "../../authentication/models/user-pass.model";
import {JWTService} from "../../authentication/services/jwt.service";
import {AuthService} from "../../authentication/services/auth.service";
import {AuthModelService} from "../../authentication/services/auth-model.service";
import {UserPassService} from "../../authentication/services/user-pass.service";



@Module({
  controllers: [UserController],
  providers: [UsersService, AuthService, AuthModelService, UserPassService, JWTService],
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
