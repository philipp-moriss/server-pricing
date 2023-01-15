import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthTokenModel, AuthTokenModelType } from "../models/auth-token.model";
import { Model } from "mongoose";
import { LoginResponseDto } from "../dto/login-response-dto";

@Injectable()
export class AuthModelService {
  constructor(@InjectModel(AuthTokenModel.name) private authTokenModel: Model<AuthTokenModelType>) {
  }

  async getTokenModel(_id: string) {
    const model = await this.authTokenModel.findById(_id);
    return model;
  }

  async createTokenModel(dto: LoginResponseDto) {
    const newToken = new this.authTokenModel(dto);
    return newToken.save();
  }

  async updateToken(dto: LoginResponseDto) {
    const oldModel = await this.getTokenModel(dto._id);

    if (oldModel) {
      const res = await this.authTokenModel.findByIdAndUpdate(dto._id,
        { token: dto.token },
        { new: true });
      return res;
    }

    const res = await this.createTokenModel(dto);
    return res;
  }

  async deleteTokenModel(_id: string) {
    await this.authTokenModel.deleteOne({ _id });
  }
}