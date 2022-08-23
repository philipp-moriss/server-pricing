import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async registration(email: string, password: string): Promise<boolean> {
    if (email && password) {
      return true;
    }
    return false;
  }

  async login(email: string, password: string): Promise<boolean> {
    if (email === '1' && password === '1') {
      return true;
    }
    return false;
  }
}
