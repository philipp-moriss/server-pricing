import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthModel } from "./auth.model";
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthModelService } from "./auth-model.service";
import { AuthTokenModel } from "./auth-token.model";
import { JwtService } from "@nestjs/jwt";

interface JwtPayload {
  exp: number,
  iat: number,
  email: string,
  _id: string,
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authModelService: AuthModelService
  ) {
  }

  async register(dto: CreateAuthDto): Promise<AuthModel> {
    const existingUser = await this.usersService.getUser(dto.email);

    if (existingUser) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }

    await this.usersService.createUser(dto);

    const newUser = await this.usersService.getUser(dto.email);

    const token = this.generateToken(newUser._id, newUser.email);

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

    const token = this.generateToken(email, _id);

    const tokenInstance = await this.authModelService.updateToken({ _id, token });

    return tokenInstance;
  }

  async validateUser({ email, password }: RequestUserDto): Promise<boolean> {
    const user = await this.usersService.getUser(email);
    const isEqual = await bcrypt.compare(password, user.passwordHash);
    return isEqual;
  }

  async logout(_id: string) {
    await this.authModelService.deleteTokenModel(_id);
  }

  generateToken(email: string, _id: string) {
    return this.jwtService.sign({ email, _id });
  }

  checkTokenExpiry(jwt: string): JwtPayload | null {
    const [, token] = jwt.split(" ");
    const jwtPayload = this.jwtService.decode(token) as JwtPayload;
    const currentTime = new Date().getTime() / 1000;
    const isExpired = jwtPayload.exp < currentTime;
    return !isExpired ? jwtPayload : null;
  }
}
