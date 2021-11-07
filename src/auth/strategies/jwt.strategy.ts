import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from './constants';
import {AuthService} from "../auth.service";
import {use} from "passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userAuth: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: {sub: number, email: string}) {
        const user = await this.userAuth.findByCond({email: payload.email, id: payload.sub});
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}
