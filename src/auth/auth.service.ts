import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { RequestUserDto } from "./dto/request-auth.dto";
import { AuthModel } from "./auth.model";
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthModelService } from "./auth-model.service";
import { AuthTokenModel } from "./auth-token.model";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
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

    const token = this.tokenService.generateToken(newUser._id, newUser.email);

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

    const token = this.tokenService.generateToken(email, _id);

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
}
