import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTestingMock(): string {
    return JSON.stringify([{ wallet: 'test', currency: 'usd' }]);
  }
}
