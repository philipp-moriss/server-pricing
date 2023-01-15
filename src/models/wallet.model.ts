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


  @Prop({
    type: () => [ICategory],
    nullable: true,
    default: [
      {
        _id: new Types.ObjectId(),
        value: "USD"
      },
      {
        _id: new Types.ObjectId(),
        value: "EUR"
      },
      {
        _id: new Types.ObjectId(),
        value: "BY"
      },
    ],
  })
  castCurrency: Array<ICurrency>

  @Prop({ nullable: true })
  totalSpends: number;

  @Prop({
    type: () => [ICategory],
    nullable: true,
    default: [
      {
        _id: new Types.ObjectId(),
        value: "Food Store",
        color: '#f2a5a5'
      },
      {
        _id: new Types.ObjectId(),
        value: "Clothing Shop",
        color: '#bd465c'
      },
      {
        _id: new Types.ObjectId(),
        value: "Communal services",
        color: '#b346bd'
      },
      {
        _id: new Types.ObjectId(),
        value: "Entertainment",
        color: '#7346bd'
      },
      {
        _id: new Types.ObjectId(),
        value: "Auto services",
        color: '#3337a6'
      },
      {
        _id: new Types.ObjectId(),
        value: "Gifts",
        color: '#3369a6'
      },
      {
        _id: new Types.ObjectId(),
        value: "Cigarettes and alcohol",
        color: '#33a6a6'
      },
      {
        _id: new Types.ObjectId(),
        value: "Other",
        color: '#33a676'
      }
    ],
  })
  myCategories: Array<ICategory>;
}



export const WalletModelSchema = SchemaFactory.createForClass(WalletModel)
