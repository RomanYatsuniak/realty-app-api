import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';

@Module({
  controllers: [RealtyController],
  providers: [RealtyService]
})
export class RealtyModule {}
