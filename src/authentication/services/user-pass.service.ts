import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserPassModel, UserPassModelType } from "../models/user-pass.model";
import { InjectModel } from "@nestjs/mongoose";
import { UserPassDto } from "../dto/user-pass.dto";

@Injectable()
export class UserPassService {
  constructor(@InjectModel(UserPassModel.name) private userPassModel: Model<UserPassModelType>) {
  }

  async get(_id) {
    const res = await this.userPassModel.findById(_id);
    return res;
  }

  async create(dto: UserPassDto) {
    await this.userPassModel.create(dto);
  }

  async update(dto: UserPassDto) {
    const res = await this.userPassModel.findByIdAndUpdate(dto._id,
      { passwordHash: dto.passwordHash },
      { new: true });
    return res;
  }

  async delete(_id) {
    await this.userPassModel.findByIdAndDelete(_id);
  }
}