import {Types} from "mongoose";
import {BadRequestException} from "@nestjs/common";

export function toMongoObjectId({ value, key }): Types.ObjectId {
    if ( Types.ObjectId.isValid(value) && ( new Types.ObjectId(value).toString() === value)) {
        return value;
    } else {
        throw new BadRequestException(`${key} is not a valid MongoId`);
    }
}
