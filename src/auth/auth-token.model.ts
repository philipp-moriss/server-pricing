import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AuthTokenModelType = AuthTokenModel & Document

@Schema()
export class AuthTokenModel {
  @Prop()
  token: string;
}

export const AuthTokenModelSchema = SchemaFactory.createForClass(AuthTokenModel);