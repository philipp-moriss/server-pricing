import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { RequestUserDto } from './dto/request-auth.dto';
import { AuthModel } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../user/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ email, password }: RequestUserDto): Promise<AuthModel> {
    const existingUser = await this.usersService.getUser(email);

    if (existingUser) {
      throw new HttpException('UserModel already exists', HttpStatus.CONFLICT);
    }

    await this.usersService.createUser({ password, email });

    const newUser = await this.usersService.getUser(email);

    return {
      email: newUser.email,
      _id: newUser._id,
      token: this.jwtService.sign({
        email: newUser.email,
      }),
    };
  }

  async login(dto: RequestUserDto): Promise<UserModel | null> {
    const isUserValid = await this.validateUser(dto);
    if (!isUserValid) {
      return null;
    }
    const user = await this.usersService.getUser(dto.email);
    return user;
  }

  async validateUser({ email, password }: RequestUserDto): Promise<boolean> {
    const user = await this.usersService.getUser(email);
    const isEqual = await bcrypt.compare(password, user.passwordHash);
    return isEqual;
  }
}
