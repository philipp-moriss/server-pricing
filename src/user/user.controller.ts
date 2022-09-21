import { Controller, Get, Headers, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserModel } from "./user.model";
import { JWTService } from "../auth/services/jwt.service";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("users")
export class UserController {
  constructor(private usersService: UsersService,
              private jwtService: JWTService) {
  }

  @UseGuards(AuthGuard)
  @Get("/user")
  getUserById(@Headers("authorization") token: string): Promise<UserModel | null> {
    const jwtPayload = this.jwtService.checkTokenExpiry(token);
    if (jwtPayload) {
      const { _id } = jwtPayload;
      return this.usersService.getUserById(_id);
    }
  }
}
