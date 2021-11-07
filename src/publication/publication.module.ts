import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Publication} from "./entities/publication.entity";
import {Realty} from "../realty/entities/realty.entity";
import {PublicationReviews} from "./entities/publication-reviews.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Publication, Realty, PublicationReviews])],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService]
})
export class PublicationModule {}
