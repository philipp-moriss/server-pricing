import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { RequestUserDto } from './dto/request-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registration(@Body() dto: RequestUserDto) {
    const newUser = await this.authService.register(dto);
    if (!newUser) {
      throw new BadRequestException('register');
    }
    return newUser;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: RequestUserDto) {
    if (!dto.email || !dto.password) {
      throw new HttpException('Login data was not provided', 401);
    }
    const user = await this.authService.login(dto);
    if (!user) {
      throw new HttpException('Wrong email or password', 401);
    }
    return user;
  }
}
