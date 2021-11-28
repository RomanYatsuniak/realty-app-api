import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { Image } from './entities/image.entity';
import { RealtyRent } from './entities/realty-rent.entity';
import { Realty } from './entities/realty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, RealtyRent, Realty])],
  controllers: [RealtyController],
  providers: [RealtyService],
})
export class RealtyModule {}
