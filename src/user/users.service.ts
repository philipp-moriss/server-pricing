import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from './user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelType>,
  ) {}

  async createUser({ passwordHash, email }: CreateAuthDto): Promise<User> {
    const hashPassword = await this.hashPassword(passwordHash);
    const newUser = new this.userModel({ email, passwordHash: hashPassword });
    return newUser.save();
  }

  async hashPassword(password): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 2);
    return hashPassword;
  }

  async getUser(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user || null;
  }

  async getUserById(_id: string): Promise<User | null> {
    const user = await this.userModel.findById(_id);
    return user || null;
  }
}
