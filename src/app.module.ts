/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserAuth } from './auth/entities/auth.entity';
import { PublicationModule } from './publication/publication.module';
import { RealtyModule } from './realty/realty.module';
import { Publication } from './publication/entities/publication.entity';
import { Realty } from './realty/entities/realty.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UserActivity } from './user/entities/user-activity.entity';
import { UserRating } from './user/entities/user-rating.entity';
import { UserReviews } from './user/entities/user-reviews.entity';
import { Image } from './realty/entities/image.entity';
import { RealtyRent } from './realty/entities/realty-rent.entity';
import { RealtySale } from './realty/entities/realty-sale.entity';
import { UserNotes } from './user/entities/user-notes.entity';
import { PublicationReviews } from './publication/entities/publication-reviews.entity';
import { BuyerAdditionalInfo } from './realty/entities/buyer-additional-info.entity';
import { SellerAdditionalInfo } from './realty/entities/seller-additional-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://gsdlacqn:AfboHIZEkcFKXwH4K2xmGoVrIU2hCxM9@hattie.db.elephantsql.com/gsdlacqn',
      synchronize: true,
      entities: [
        User,
        UserAuth,
        Publication,
        Realty,
        UserActivity,
        UserRating,
        UserReviews,
        Image,
        RealtyRent,
        RealtySale,
        UserNotes,
        PublicationReviews,
        BuyerAdditionalInfo,
        SellerAdditionalInfo,
      ],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REGION: Joi.string().required(),
        KEY_ID: Joi.string().required(),
        ACCESS_KEY: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    PublicationModule,
    RealtyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
