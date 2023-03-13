import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as bcrypt from "bcrypt";
import {UserModel, UserModelType} from "../../models/user.model";
import {CreateAuthDto, CreateAuthDtoGoogle} from "../../authentication/dto/create-auth.dto";
import {UserPassService} from "../../authentication/services/user-pass.service";


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModelType>,
    private userPassService: UserPassService
  ) {
  }

  async createUser({ password, email, lastName, firstName }: CreateAuthDto): Promise<UserModel> {
    const passwordHash = await this.hashPassword(password);
    const newUser = new this.userModel({ email, firstName, lastName });
    await this.userPassService.create({ _id: newUser._id, passwordHash });
    return newUser.save();
  }
  async createUserGoogle({ email }: CreateAuthDtoGoogle): Promise<UserModel> {
    const passwordHash = await this.hashPassword(email);
    const newUser = new this.userModel({ email });
    await this.userPassService.create({ _id: newUser?._id, passwordHash });
    return newUser.save();
  }

    async hashPassword(password): Promise<string> {
        return await bcrypt.hash(password, 2);
    }

    async getUser(email: string): Promise<UserModel | null> {
        return await this.userModel.findOne({email});
    }

    async getPassModelById(_id: string) {
        return await this.userPassService.get(_id);
    }

    async updateUserById(_id: string, newUserData: UserModel): Promise<UserModel | null> {
        return await this.userModel.findByIdAndUpdate(_id, newUserData, {overwrite: true});
    }

    async setFirstEnter(userId: string, isFirstEnter): Promise<UserModel | null> {
        return await this.userModel.findByIdAndUpdate(userId, {isFirstEnter}, {overwrite: false, new: true});
    }

    async getUserById(_id: string): Promise<UserModel | null> {
        const user = await this.userModel.findById(_id);
        return user || null;
    }
}
