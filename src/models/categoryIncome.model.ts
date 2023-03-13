import {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true, validateBeforeSave: true})
export class CategoryIncomeModel extends Document {
    _id: string;
    @Prop({
        required: true,
    })
    userId: string;
    @Prop({
        required: true,
    })
    value: string;
    @Prop({
        required: true,
    })
    color: string

    @Prop({
        required: true,
    })
    operation: 'spend' | 'income'
}


export const CategorySpendSchema = SchemaFactory.createForClass(CategoryIncomeModel)
