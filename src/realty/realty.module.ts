import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [RealtyController],
  providers: [RealtyService],
})
export class RealtyModule {}
