import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { idExample, jwtExample } from "../constants";

export type AuthTokenModelType = AuthTokenModel & Document

@Schema()
export class AuthTokenModel {
  @ApiProperty(jwtExample)
  @Prop()
  token: string;

  @ApiProperty(idExample)
  @Prop()
  _id: string
}

export const AuthTokenModelSchema = SchemaFactory.createForClass(AuthTokenModel);