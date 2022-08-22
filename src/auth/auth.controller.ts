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

@Controller('auth')
export class AuthController {
  @Post('register')
  async registration(@Body() dto: RegisterDto, @Res() res: Response) {
    if (dto.email && dto.password) {
      return true;
    }
    throw new BadRequestException('register');
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    if (dto.email === '1' && dto.password === '1') {
      return true;
    }
    throw new HttpException('Login', 401);
  }
}
