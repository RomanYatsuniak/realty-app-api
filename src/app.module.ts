import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import {UserAuth} from "./auth/entities/auth.entity";
import { PublicationModule } from './publication/publication.module';
import { RealtyModule } from './realty/realty.module';
import {Publication} from "./publication/entities/publication.entity";
import {Realty} from "./realty/entities/realty.entity";
import {ConfigModule} from "@nestjs/config";
import * as Joi from '@hapi/joi';
import {UserActivity} from "./user/entities/user-activity.entity";
import {UserRating} from "./user/entities/user-rating.entity";
import {UserReviews} from "./user/entities/user-reviews.entity";
import {Image} from "./realty/entities/image.entity";
import {RealtyRentEntity} from "./realty/entities/realty-rent.entity";
import {RealtySale} from "./realty/entities/realty-sale.entity";
import {UserNotes} from "./user/entities/user-notes.entity";
import {PublicationReviews} from "./publication/entities/publication-reviews.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
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
      RealtyRentEntity,
      RealtySale,
      UserNotes,
      PublicationReviews
    ]
  }), ConfigModule.forRoot({
    validationSchema: Joi.object({
      AWS_REGION: Joi.string().required(),
      AWS_ACCESS_KEY_ID: Joi.string().required(),
      AWS_SECRET_ACCESS_KEY: Joi.string().required()
    })
  }), UserModule, AuthModule, PublicationModule, RealtyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
