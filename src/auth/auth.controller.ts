import { BadRequestException, Body, Controller, Headers, HttpCode, HttpException, Post } from "@nestjs/common";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import {UserModel} from "../user/user.model";
import {IAuthUser} from "../user/User";

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
  async login(@Body() dto: RequestUserDto) : Promise<IAuthUser | null> {

    if (!dto.email || !dto.password) {
      throw new HttpException("Login data was not provided", 401);
    }
    const user = await this.authService.login(dto);
    if (!user) {
      throw new HttpException("Wrong email or password", 401);
    }
    console.log(user)
    return user;
  }

  @HttpCode(201)
  @Post("logout")
  async logout(@Headers("authorization") jwt: string) {
    const jwtPayload = this.authService.checkTokenExpiry(jwt)
    if (!jwtPayload) {
      throw new HttpException("Your token is expired", 400);
    } else {
      await this.authService.logout(jwtPayload._id);
    }
  }
}
