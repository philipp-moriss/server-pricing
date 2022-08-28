import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { RequestUserDto } from './dto/request-auth.dto';
import { AuthModel } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ email, password }: RequestUserDto): Promise<AuthModel> {
    const existingUser = await this.usersService.getUser(email);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const passwordHash = await this.usersService.hashPassword(password);
    await this.usersService.createUser({ passwordHash, email });

    const newUser = await this.usersService.getUser(email);

    return {
      email: newUser.email,
      _id: newUser._id,
      token: this.jwtService.sign({
        email: newUser.email,
        _id: newUser._id,
      }),
    };
  }

  async login(dto: RequestUserDto): Promise<User | null> {
    const isUserValid = await this.validateUser(dto);
    if (!isUserValid) {
      return null;
    }
    const user = await this.usersService.getUser(dto.email);
    return user;
  }

  async validateUser({
    email,
    password,
  }: RequestUserDto): Promise<User | null> {
    const user = await this.usersService.getUser(email);
    const isEqual = await bcrypt.compare(password, user.passwordHash);
    console.log(isEqual);
    return isEqual ? user : null;
  }
}
