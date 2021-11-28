import { Module } from '@nestjs/common';
import { RealtyService } from './realty.service';
import { RealtyController } from './realty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { Image } from './entities/image.entity';
import { RealtyRent } from './entities/realty-rent.entity';
import { Realty } from './entities/realty.entity';
import { RealtySale } from './entities/realty-sale.entity';
import { SellerAdditionalInfo } from './entities/seller-additional-info.entity';
import { BuyerAdditionalInfo } from './entities/buyer-additional-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image,
      RealtyRent,
      Realty,
      RealtySale,
      SellerAdditionalInfo,
      BuyerAdditionalInfo,
    ]),
  ],
  controllers: [RealtyController],
  providers: [RealtyService],
})
export class RealtyModule {}
