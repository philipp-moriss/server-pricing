import { BadRequestException, Body, Controller, Headers, HttpCode, HttpException, Post, Res } from "@nestjs/common";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("register")
  async registration(@Body() dto: CreateAuthDto) {
    const newUser = await this.authService.register(dto);
    if (!newUser) {
      throw new BadRequestException("register");
    }
    return newUser;
  }

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

  @Post("logout")
  @HttpCode(201)
  async logout(@Headers("authorization") jwt: string) {
    const jwtPayload = this.authService.checkTokenExpiry(jwt);
    if (!jwtPayload) {
      throw new HttpException("Your token is expired", 400);
    } else {
      await this.authService.logout(jwtPayload._id);
      return 201;
    }
  }
}
