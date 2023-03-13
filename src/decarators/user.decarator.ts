import { createParamDecorator, ExecutionContext } from '@nestjs/common';


type User = {
    _id: string;
    email : string;
}

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) : User => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);
