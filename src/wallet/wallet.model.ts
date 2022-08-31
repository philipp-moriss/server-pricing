import { SpendingModel } from '../spending/spending.model';
import { Document } from 'mongoose';
import {Prop, Schema} from '@nestjs/mongoose';
// export type WalletModelType = WalletModel & Document


@Schema({ timestamps: true, validateBeforeSave: true })
export class WalletModel extends Document{
  _id: string;

  @Prop()
  icon: string;

  @Prop()
  name: string;

  @Prop()
  balance: number;

  @Prop()
  currency: string;

  @Prop()
  totalSpends: number;

  @Prop()
  myCategories: Array<ICategory>;

  @Prop({nullable: true})
  history: Array<SpendingModel> | null;
}

export interface ICategory {
  _id: string;
  value: string;
}
