import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../../user/users.service";
import { RequestUserDto } from "../dto/request-auth.dto";
import { AuthModel } from "../models/auth.model";
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from "../dto/create-auth.dto";
import { AuthModelService } from "./auth-model.service";
import { AuthTokenModel } from "../models/auth-token.model";
import { JWTService } from "./jwt.service";

export interface JwtPayload {
  exp: number,
  iat: number,
  email: string,
  _id: string,
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private authModelService: AuthModelService,
    private jwtService: JWTService
  ) {
  }

  async register(dto: CreateAuthDto): Promise<AuthModel> {
    const existingUser = await this.usersService.getUser(dto.email);
    if (existingUser) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }
    await this.usersService.createUser(dto);
    const newUser = await this.usersService.getUser(dto.email);
    const token = this.jwtService.generateShortToken(newUser._id, newUser.email);
    await this.authModelService.createTokenModel({ _id: newUser._id, token });
    return {
      email: newUser.email,
      _id: newUser._id,
      token
    };
  }

  async login(dto: RequestUserDto): Promise<AuthTokenModel | null> {
    const isUserValid = await this.validateUser(dto);
    if (!isUserValid) {
      return null;
    }
    const { _id, email } = await this.usersService.getUser(dto.email);
    const token = this.jwtService.generateShortToken(email, _id);
    const tokenInstance = await this.authModelService.updateToken({ _id, token });
    return tokenInstance;
  }

  async testLoginWithShortToken(dto: RequestUserDto): Promise<AuthTokenModel | null> {
    const isUserValid = await this.validateUser(dto);
    if (!isUserValid) {
      return null;
    }
    const { _id, email } = await this.usersService.getUser(dto.email);
    const token = this.jwtService.generateOneSecondToken(email, _id);
    const tokenInstance = await this.authModelService.updateToken({ _id, token });
    return tokenInstance;
  }

  async refreshToken(jwt: string) {
    const { _id, email } = this.jwtService.decodeToken<JwtPayload>(jwt);
    const payload = this.jwtService.generateLongToken(email, _id);
    return payload;
  }

  async validateUser({ email, password }: RequestUserDto): Promise<boolean> {
    const user = await this.usersService.getUser(email);
    const pass = await this.usersService.getPassModelById(user._id);
    const isEqual = await bcrypt.compare(password, pass.passwordHash);
    return isEqual;
  }

  async logout(_id: string) {
    await this.authModelService.deleteTokenModel(_id);
  }
}
