import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserModel, UserModelType } from "./user.model";
import { Model, Types } from "mongoose";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import * as bcrypt from "bcrypt";
import { UserPassModel, UserPassModelType } from "../auth/models/user-pass.model";
import { UserPassService } from "../auth/services/user-pass.service";

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

  async hashPassword(password): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 2);
    return hashPassword;
  }

  async getUser(email: string): Promise<UserModel | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getPassModelById(_id) {
    const passModel = await this.userPassService.get(_id);
    return passModel;
  }

  async updateUserById(_id: string, newUserData: UserModel): Promise<UserModel | null> {
    const updateUser = await this.userModel.findByIdAndUpdate(_id, newUserData, { overwrite: true });
    return updateUser;
  }

  async getUserById(_id: string): Promise<UserModel | null> {
    const user = await this.userModel.findById(_id);
    return user || null;
  }
}
