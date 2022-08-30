import { Controller, Get, Param, ParamData } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/user/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUserById(id);
  }
}
