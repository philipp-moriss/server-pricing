import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModelService } from "./services/auth-model.service";
import { AuthTokenModel, AuthTokenModelSchema } from "./models/auth-token.model";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthModelService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" }
    }),
    MongooseModule.forFeature([
      { name: AuthTokenModel.name, schema: AuthTokenModelSchema }
    ])
  ],
})
export class AuthModule {
}
