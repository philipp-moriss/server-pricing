import { Document } from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class ReplenishmentModel extends Document{
    _id: string;

    @Prop({
        type: () => String,
        nullable: false,
        required: true,
    })
    title: string;

    @Prop({
        type: () => String,
        nullable: true,
    })
    walletName: string;

    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: true,
    })
    walletId: string;


    @Prop({
        type: () => String,
        nullable: true,
        required: false,
    })
    description: string;

    @Prop({
        type: () => String,
        required: true,
    })
    category: string;

    @Prop({
        type: () => Number,
        nullable: false,
        required: true,
    })
    amount: number;

    @Prop({
        type: () => String,
        nullable: false,
        required: true,
    })
    currency: string;

    @Prop({
        type: () => Date,
        nullable: false,
    })
    date: Date;

    @Prop({
        type: () => Date,
        nullable: false,
    })
    createdAt: Date;
}



export const ReplenishmentModelSchema = SchemaFactory.createForClass(ReplenishmentModel)
