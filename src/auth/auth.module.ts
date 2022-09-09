import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModelService } from "./auth-model.service";
import { AuthTokenModel, AuthTokenModelSchema } from "./auth-token.model";
import { TokenModule } from "../token/token.module";
import { TokenService } from "../token/token.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthModelService, TokenService, JwtService],
  imports: [
    UserModule,
    MongooseModule,
    TokenModule,
    MongooseModule.forFeature([
      { name: AuthTokenModel.name, schema: AuthTokenModelSchema }
    ])
  ],
})
export class AuthModule {
}
