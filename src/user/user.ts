import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export type UserModelType = User & Document;

Schema({ timestamps: true, validateBeforeSave: true });
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatarImg: string;

  @Prop()
  permission: string;

  @Prop()
  active: boolean;

  @Prop(() => [String])
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

  @Prop()
  createdAt?: string;

  @Prop()
  passwordHash: string;
}

// export const UserModelSchema = SchemaFactory.createForClass(User);
export const UserModelSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  avatarImg: {
    type: String,
    default: null,
  },
  permission: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  walletsId: {
    type: [String],
    default: [],
  },
});
