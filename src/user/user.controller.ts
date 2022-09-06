import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/user/:id')
  getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.getUserById(id);
  }
}
