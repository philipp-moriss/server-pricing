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
      expiresIn: "2h"
    });
  }

  generateLongToken(email: string, _id: string) {
    return this.jwtService.sign({ email, _id }, {
      secret: jwtConstants.secret,
      expiresIn: "24h"
    });
  }

  checkTokenExpiry(token: string): JwtPayload {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: jwtConstants.secret
      });
      return payload;
    } catch (_) {
      throw new HttpException("jwt expired", HttpStatus.FORBIDDEN);
    }
  }

  decodeToken<T>(jwt: string): T {
    const [, token] = jwt.split(" ");
    const payload = this.jwtService.decode(token) as T;
    return payload;
  }
}