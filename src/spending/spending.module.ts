import { Module } from '@nestjs/common';
import { SpendingController } from './spending.controller';

@Module({
  controllers: [SpendingController],
})
export class SpendingModule {}
