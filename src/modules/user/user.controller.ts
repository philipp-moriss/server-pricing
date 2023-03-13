import {Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserModel} from "../../models/user.model";
import {JwtPayload} from "../../authentication/services/auth.service";
import {JWTService} from "../../authentication/services/jwt.service";
import {AuthGuard} from "../../common/guards/auth.guard";
import {User} from "../../common/decarators/user.decarator";
import {setFirstEnterDto} from "./dto/user.dto";


@Controller("user")
export class UserController {
    constructor(private usersService: UsersService,
                private jwtService: JWTService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    getUserById(@Headers("authorization") token: string): Promise<UserModel | null> {
        const jwtPayload = this.jwtService.decodeToken<JwtPayload>(token);
        if (jwtPayload) {
            const {_id} = jwtPayload;
            return this.usersService.getUserById(_id);
        }
        if (!jwtPayload) {
            throw new HttpException('Не предвиденная ошибка, попробуйте позже', HttpStatus.NOT_MODIFIED);
        }
    }

    @UseGuards(AuthGuard)
    @Post()
    async updateUserById(@Body() body: UserModel, @User('_id') userId: string): Promise<UserModel | null> {
        const updateUser = await this.usersService.updateUserById(userId, body)
        if (!updateUser) {
            throw new HttpException('Не предвиденная ошибка, попробуйте позже', HttpStatus.NOT_MODIFIED);
        }
        return updateUser
    }
    @UseGuards(AuthGuard)
    @Post()
    async updateUserPassword(@Body() body: UserModel, @User('_id') userId: string) {
        console.log(1)
    }

    @UseGuards(AuthGuard)
    @Put("/setFirstEnter")
    async setFirstEnter(@Body() body: setFirstEnterDto, @User('_id') userId: string) {
        const updateUser = await this.usersService.setFirstEnter(userId, body.isFirstEnter)
        if (!updateUser) {
            throw new HttpException('Не предвиденная ошибка, попробуйте позже', HttpStatus.NOT_MODIFIED);
        }
        return updateUser
    }

}
