import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserModelType = UserModel & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class UserModel extends Document {

  @Prop({ nullable: true, default: null })
  firstName: string;

  @Prop({ nullable: true, default: null })
  lastName: string;

  @Prop({ nullable: true, default: null })
  avatarImg: string;

  @Prop({ nullable: true, default: null})
  permission: string;

  @Prop({default: true})
  isFirstEnter: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop({
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
  })
  email: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
