import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./strategies/constants";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {UserAuth} from "./entities/auth.entity";
import {LocalStrategy} from "./strategies/local.strategy";
import {SharedModule} from "../shared/shared.module";
import {UserReviews} from "../user/entities/user-reviews.entity";
import {PublicationModule} from "../publication/publication.module";
import {UserNotes} from "../user/entities/user-notes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth, User, UserReviews, UserNotes]), UserModule, PassportModule, PublicationModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '12000000s' }
  }), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
