import {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ICategory} from "./wallet.model";
import {Transform, Type} from "class-transformer";
import {toMongoObjectId} from "../common/helpers/handlers/userIdHandler";

@Schema({timestamps: true, validateBeforeSave: true})
export class CategorySpendModel extends Document {
    _id: string
    @Prop({
        required: true,
    })
    userId: string;
    @Prop({
        lowercase: true,
        trim: true,
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


export const CategoryModelSchema = SchemaFactory.createForClass(CategorySpendModel)
