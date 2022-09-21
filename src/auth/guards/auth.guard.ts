import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JWTService } from "../services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const [bearer, token] = req.headers.authorization.split(" ", 2);
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("You are not authorized");
      }
      const isVerified = this.jwtService.checkTokenExpiry(token);
      return !!isVerified;
    } catch (e: any) {
      const { statusCode, message } = e.response;
      throw new HttpException(message, statusCode);
    }
  }
}