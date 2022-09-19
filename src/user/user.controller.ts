import { Controller, Get, Headers, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserModel } from "./user.model";
import { JWTService } from "../auth/services/jwt.service";

@Controller("users")
export class UserController {
  constructor(private usersService: UsersService,
              private jwtService: JWTService) {
  }

  @Get("/user")
  getUserById(@Headers("authorization") token: string): Promise<UserModel | null> {
    if (!token) {
      throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED)
    }
    const jwtPayload = this.jwtService.checkTokenExpiry(token);
    if (jwtPayload) {
      const { _id } = jwtPayload;
      return this.usersService.getUserById(_id);
    }
  }
}
