import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JWTService } from "../auth/services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      if (!req.headers.authorization) {
        throw new UnauthorizedException("You are not authorized");
      }
      const [bearer, token] = req.headers.authorization.split(" ", 2);
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("You are not authorized");
      }
      const isVerified = this.jwtService.checkTokenExpiry(token);
      return !!isVerified;
    } catch (e: any) {
      if (e.statusCode) {
        const { statusCode, message } = e.response;
        throw new HttpException(message, statusCode);
      }
      const { response, status } = e;
      throw new HttpException(response, status);
    }
  }
}