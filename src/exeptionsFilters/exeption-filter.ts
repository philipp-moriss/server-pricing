import {ValidationError} from "class-validator";
import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from "express"
import { Error } from "mongoose";

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter<ValidationError> {
    public catch (exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse() as Response
        response
            .status(422)
            .json({
                statusCode: 422,
                error: `Unprocessable Entity`,
                message: exception.message.message,
            })
    }
}


@Catch(Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter<Error.ValidationError> {
    public catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse() as Response
        response
            .status(422)
            .json({
                statusCode: 422,
                error: `Unprocessable Entity`,
                message: exception.message,
            })
    }
}
