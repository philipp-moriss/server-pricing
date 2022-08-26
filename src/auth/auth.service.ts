import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async registration(email: string, password: string): Promise<boolean> {
    return !!(email && password);
  }

  async login(email: string, password: string): Promise<boolean> {
    return email === '1' && password === '1';
  }
}
