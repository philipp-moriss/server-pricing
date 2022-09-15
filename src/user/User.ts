import {AuthTokenModel} from "../auth/auth-token.model";
import {Types} from "mongoose";

export interface IAuthUser {
    token: AuthTokenModel,
    user : {
        userId : Types.ObjectId,
    }
}
