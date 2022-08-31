import { SpendingModel } from '../spending/spending.model';
import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
// export type WalletModelType = WalletModel & Document


export class ICategory {
  _id: string;
  @Prop({
    lowercase: true,
    trim: true,
  })
  value: string;
}


@Schema({ timestamps: true, validateBeforeSave: true })
export class WalletModel extends Document{
  _id: string;

  @Prop()
  icon: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  balance: number;

  @Prop({
    required: true,
  })
  currency: string;

  @Prop({ nullable: true })
  totalSpends: number;

  @Prop({
    type: () => [ICategory],
    nullable: true
  })
  myCategories: Array<ICategory>;

  @Prop({
    type: () => [SpendingModel],
    nullable: true
  })
  history: Array<SpendingModel> | null;
}



export const WalletModelSchema = SchemaFactory.createForClass(WalletModel)
