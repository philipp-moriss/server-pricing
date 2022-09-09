import { Controller, Get, Param, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { JwtService } from "@nestjs/jwt";

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  @Get('/user/:id')
  getUserById(@Param('id') id: string, @Headers('authorization') token: string): Promise<UserModel | null> {

    return this.usersService.getUserById(id);
  }
}
