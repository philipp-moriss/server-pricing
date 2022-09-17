import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserPassModelType = UserPassModel & Document;

@Schema()
export class UserPassModel extends Document {
  @Prop()
  passwordHash: string;
}

export const UserPassSchema = SchemaFactory.createForClass(UserPassModel)