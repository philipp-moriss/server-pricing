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

  @Prop({ nullable: true })
  totalSpends: number;

  @Prop({
    type: () => [ICategory],
    nullable: true,
    default: [
      {
        _id: new Types.ObjectId(),
        value: "Food Store"
      },
      {
        _id: new Types.ObjectId(),
        value: "Clothing Shop"
      },
      {
        _id: new Types.ObjectId(),
        value: "Communal services"
      },
      {
        _id: new Types.ObjectId(),
        value: "Entertainment"
      },
      {
        _id: new Types.ObjectId(),
        value: "Auto services"
      },
      {
        _id: new Types.ObjectId(),
        value: "Gifts"
      },
      {
        _id: new Types.ObjectId(),
        value: "Cigarettes and alcohol"
      },
      {
        _id: new Types.ObjectId(),
        value: "Other"
      }
    ],
  })
  myCategories: Array<ICategory>;
}



export const WalletModelSchema = SchemaFactory.createForClass(WalletModel)
