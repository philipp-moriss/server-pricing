import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";

export type UserModelType = UserModel & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class UserModel extends Document {
  @Prop({ nullable: true })
  firstName: string;

  @Prop({ nullable: true, default: null })
  lastName: string;

  @Prop({ nullable: true, default: null })
  avatarImg: string;

  @Prop({ nullable: true, default: null})
  permission: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: () => [String], nullable: true , default: []})
  walletsId: Array<string>;

  @IsNotEmpty()
  @IsEmail()
  @Prop({
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({ maxlength: 120, select: false })
  passwordHash: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
