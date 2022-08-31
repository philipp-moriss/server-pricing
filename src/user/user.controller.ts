import { Controller, Get, Param, ParamData } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import {Types} from "mongoose";

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/user/:id')
  getUserById(@Param('id') id: string): Promise<UserModel | null> {
    const userObjectId = new Types.ObjectId(id)
    return this.usersService.getUserById(userObjectId);
  }
}
