import { BadRequestException, Body, Controller, Headers, HttpCode, HttpException, Post } from "@nestjs/common";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthService } from "./services/auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthModel } from "./models/auth.model";
import { JWTService } from "./services/jwt.service";

import { RefreshDto } from "./dto/refresh.dto";
import {UserModel} from "../models/user.model";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService,
              private jwtService: JWTService) {
  }

  @ApiOperation({ summary: "New user register" })
  @ApiResponse({ status: 201, type: AuthModel })
  @HttpCode(201)
  @Post("register")
  async registration(@Body() dto: CreateAuthDto) {
    const newUser = await this.authService.register(dto);
    if (!newUser) {
      throw new BadRequestException("register");
    }
    return newUser;
  }

  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 201, type: UserModel })
  @HttpCode(201)
  @Post("login")
  async login(@Body() dto: RequestUserDto) {
    if (!dto.email || !dto.password) {
      throw new HttpException("Login data was not provided", 401);
    }
    const user = await this.authService.login(dto);
    if (!user) {
      throw new HttpException("Wrong email or password", 401);
    }
    return user;
  }

  @ApiOperation({ summary: "Current user logging out" })
  @ApiResponse({ status: 201 })
  @Post("logout")
  @HttpCode(201)
  async logout(@Headers("authorization") jwt: string) {
    const [, token] = jwt.split(" ", 2);
    const jwtPayload = this.jwtService.checkTokenExpiry(token);
    if (!jwtPayload) {
      throw new HttpException("Your token is expired", 400);
    } else {
      await this.authService.logout(jwtPayload._id);
      return 201;
    }
  }

  @ApiOperation({ summary: "Refresh expired token" })
  @ApiResponse({ status: 201, type: RefreshDto })
  @HttpCode(201)
  @Post("refresh")
  async refresh(@Headers("authorization") jwt: string) {
    const newToken = await this.authService.refreshToken(jwt);
    return { token: newToken };
  }
}
