import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registration(@Body() dto: RegisterDto, @Res() res: Response) {
    const isRegister = this.authService.registration(dto.email, dto.password);
    if (!isRegister) {
      throw new BadRequestException('register');
    }
    return true;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const isLogin = this.authService.login(dto.email, dto.password);
    if (!isLogin) {
      throw new HttpException('Login', 401);
    }
    return true;
  }
}
