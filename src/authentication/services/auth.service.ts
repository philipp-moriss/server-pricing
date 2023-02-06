import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {RequestUserDto} from "../dto/request-auth.dto";
import {AuthModel} from "../models/auth.model";
import * as bcrypt from "bcrypt";
import {CreateAuthDto, CreateAuthDtoGoogle} from "../dto/create-auth.dto";
import {AuthModelService} from "./auth-model.service";
import {AuthTokenModel} from "../models/auth-token.model";
import {JWTService} from "./jwt.service";
import {UsersService} from "../../modules/user/users.service";


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
            throw new HttpException("Пользователь уже существует", HttpStatus.CONFLICT);
        }
        await this.usersService.createUser(dto);
        const newUser = await this.usersService.getUser(dto.email);
        const token = this.jwtService.generateShortToken(newUser._id, newUser.email);
        await this.authModelService.createTokenModel({_id: newUser._id, token});
        return {
            email: newUser.email,
            _id: newUser._id,
            token
        };
    }

    async registerGoogle({email}: CreateAuthDtoGoogle): Promise<AuthModel> {
        const existingUser = await this.usersService.getUser(email);
        if (existingUser) {
            throw new HttpException(`Пользователь под логином ${email} уже существует`, HttpStatus.CONFLICT);
        }
        await this.usersService.createUserGoogle({email});
        const newUser = await this.usersService.getUser(email);
        const token = this.jwtService.generateShortToken(newUser._id, newUser.email);
        await this.authModelService.createTokenModel({_id: newUser._id, token});
        return {
            email: newUser.email,
            _id: newUser._id,
            token
        };
    }

    async loginGoogle(currentEmail: string): Promise<AuthTokenModel | null> {
        const data = await this.usersService.getUser(currentEmail);
        if (!data) {
            throw new HttpException(`Пользователя под логином ${currentEmail} не существует`, HttpStatus.CONFLICT);
        }
        const token = this.jwtService.generateShortToken(data.email, data._id);
        return await this.authModelService.updateToken({_id: data._id, token});
    }


    async login(dto: RequestUserDto): Promise<AuthTokenModel | null> {
        const isUserValid = await this.validateUser(dto);
        if (!isUserValid) {
            throw new HttpException('Неправильный логин или пороль', HttpStatus.CONFLICT);
        }
        const {_id, email} = await this.usersService.getUser(dto.email);
        const token = this.jwtService.generateShortToken(email, _id);
        const tokenInstance = await this.authModelService.updateToken({_id, token});
        return tokenInstance;
    }

    async refreshToken(jwt: string) {
        const {_id, email} = this.jwtService.decodeToken<JwtPayload>(jwt);
        const payload = this.jwtService.generateLongToken(email, _id);
        return payload;
    }

    async validateUser({email, password}: RequestUserDto): Promise<boolean> {
        const user = await this.usersService.getUser(email);
        const pass = await this.usersService.getPassModelById(user._id);
        const isEqual = await bcrypt.compare(password, pass.passwordHash);
        return isEqual;
    }

    async logout(_id: string) {
        await this.authModelService.deleteTokenModel(_id);
    }
}