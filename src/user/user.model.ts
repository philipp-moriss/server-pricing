import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserModelType = UserModel & Document;

Schema({ timestamps: true });
export class UserModel {
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

  @Prop([String])
  walletsId: Array<string>;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
