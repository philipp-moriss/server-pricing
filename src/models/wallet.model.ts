// import {SpendingModel} from '../spending/spending.model';
import {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';


export class ICategory {
  _id: string;
  @Prop({
    lowercase: true,
    trim: true,
  })
  value: string;
  color: string
}

export class ICurrency {
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
  userId: string;

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
  @Prop()
  totalSpends: number;
  @Prop()
  totalIncome: number;
}



export const WalletModelSchema = SchemaFactory.createForClass(WalletModel)
