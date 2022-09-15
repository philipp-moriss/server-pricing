import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class SpendingModel extends Document{
  _id: string;

  @Prop({
    type: () => String,
    nullable: false,
  })
  title: string;
  @Prop({
    type: () => String,
    nullable: true,
  })
  description: string;
  @Prop({
    type: () => String,
    nullable: true,
  })
  category: string;
  @Prop({
    type: () => Number,
    nullable: false,
  })
  amount: number;
  date: Date;
}



export const SpendingModelSchema = SchemaFactory.createForClass(SpendingModel)
