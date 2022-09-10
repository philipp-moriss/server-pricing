import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

interface JwtPayload {
  exp: number,
  iat: number,
  email: string,
  _id: string,
}

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {
  }

  generateToken(email: string, _id: string) {
    return this.jwtService.sign({ email, _id });
  }

  checkTokenExpiry(jwt: string): JwtPayload | null {
    const [, token] = jwt.split(" ");
    const jwtPayload = this.jwtService.decode(token) as JwtPayload;
    const currentTime = new Date().getTime() / 1000;
    const isExpired = jwtPayload.exp < currentTime;
    return !isExpired ? jwtPayload : null;
  }
}
