import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true, validateBeforeSave: true})
export class CategorySpendModel extends Document {
    _id: string;
    @Prop({
        lowercase: true,
        trim: true,
    })
    value: string;
    color: string

}


export const CategoryModelSchema = SchemaFactory.createForClass(CategorySpendModel)
