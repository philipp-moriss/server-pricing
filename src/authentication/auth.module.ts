import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";

import { MongooseModule } from "@nestjs/mongoose";
import { AuthModelService } from "./services/auth-model.service";
import { AuthTokenModel, AuthTokenModelSchema } from "./models/auth-token.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWTService } from "./services/jwt.service";
import {UserModule} from "../modules/user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthModelService, JwtService, JWTService],
  imports: [
    UserModule,
    JwtModule,
    MongooseModule.forFeature([
      { name: AuthTokenModel.name, schema: AuthTokenModelSchema }
    ])
  ]
})
export class AuthModule {
}
