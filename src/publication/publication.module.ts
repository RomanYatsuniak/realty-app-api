import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Realty } from '../realty/entities/realty.entity';
import { PublicationReviews } from './entities/publication-reviews.entity';
import { SharedModule } from '../shared/shared.module';
import { RealtyService } from '../realty/realty.service';
import { RealtyModule } from '../realty/realty.module';
import { Image } from '../realty/entities/image.entity';
import { RealtyRent } from '../realty/entities/realty-rent.entity';
import { RealtySale } from '../realty/entities/realty-sale.entity';
import { BuyerAdditionalInfo } from '../realty/entities/buyer-additional-info.entity';
import { SellerAdditionalInfo } from '../realty/entities/seller-additional-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publication,
      Realty,
      PublicationReviews,
      Image,
      RealtyRent,
      RealtySale,
      BuyerAdditionalInfo,
      SellerAdditionalInfo,
    ]),
    SharedModule,
    RealtyModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationService, RealtyService],
  exports: [PublicationService],
})
export class PublicationModule {}
