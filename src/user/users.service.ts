import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserModelType } from './user.model';
import { Model } from 'mongoose';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModelType>,
  ) {}

  async createUser({ password, email }: CreateAuthDto): Promise<UserModel> {
    const passwordHash = await this.hashPassword(password);
    console.log(passwordHash);
    const newUser = new this.userModel({ email, passwordHash });
    console.log(newUser);
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

  async getUserById(_id: string): Promise<UserModel | null> {
    const user = await this.userModel.findById(_id);
    return user || null;
  }
}
