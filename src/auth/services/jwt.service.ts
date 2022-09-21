import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { JwtPayload } from "./auth.service";

@Injectable()
export class JWTService {
  constructor(
    private jwtService: JwtService
  ) {
  }

  generateShortToken(email: string, _id: string) {
    return this.jwtService.sign({ email, _id }, {
      secret: jwtConstants.secret,
      expiresIn: "15m"
    });
  }

  generateLongToken(email: string, _id: string) {
    return this.jwtService.sign({ email, _id }, {
      secret: jwtConstants.secret,
      expiresIn: "24h"
    });
  }

  checkTokenExpiry(jwt: string): JwtPayload {
    try {
      const [, token] = jwt.split(" ");
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: jwtConstants.secret
      });
      return payload;
    } catch (e: any) {
      throw new ForbiddenException('jwt expired');
    }
  }

  decodeToken<T>(jwt: string): T {
    const payload = this.jwtService.decode(jwt) as T;
    return payload;
  }
}