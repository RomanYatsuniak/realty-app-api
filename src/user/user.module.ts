import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {ImageService} from "../shared/services/image.service";
import {SharedModule} from "../shared/shared.module";
import {UserReviews} from "./entities/user-reviews.entity";
import {PublicationService} from "../publication/publication.service";
import {PublicationModule} from "../publication/publication.module";
import {UserNotes} from "./entities/user-notes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserReviews, UserNotes]), SharedModule, PublicationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
