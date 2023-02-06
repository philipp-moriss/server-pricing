import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post
} from "@nestjs/common";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthService } from "./services/auth.service";
import {CreateAuthDto, CreateAuthDtoGoogle} from "./dto/create-auth.dto";
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
      throw new HttpException("Непредвиденная ошибка, попробуйте позже", 401);
    }
    return newUser;
  }
  @ApiOperation({ summary: "User login witch google" })
  @ApiResponse({ status: 201, type: UserModel })
  @HttpCode(201)
  @Post("login")
  async login(@Body() dto: RequestUserDto) {
    if (!dto.email || !dto.password) {
      throw new HttpException("Данные для входа в систему не были предоставлены", 401);
    }
    const user = await this.authService.login(dto);
    if (!user) {
      throw new HttpException("Неправильный адрес электронной почты или пароль", 401);
    }
    return user;
  }
  @ApiOperation({ summary: "New user register" })
  @ApiResponse({ status: 201, type: AuthModel })
  @HttpCode(201)
  @Post("register-google")
  async registrationGoogle(@Body() {email}: CreateAuthDtoGoogle) {
    const newUser = await this.authService.registerGoogle({email});
    if (!newUser) {
      throw new HttpException("Непредвиденная ошибка, попробуйте позже", 401);
    }
    return newUser;
  }
  @ApiOperation({ summary: "User login witch google" })
  @ApiResponse({ status: 201, type: UserModel })
  @HttpCode(201)
  @Post("login-google")
  async loginGoogle(@Body() {email}: {email: string}) {
    const user = await this.authService.loginGoogle(email);
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
      throw new HttpException("Срок действия вашего маркера истек", 400);
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
