import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UserService} from "../user/user.service";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {UserAuth} from "./entities/auth.entity";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(private userService: UserService, @InjectRepository(UserAuth) private authRepository: Repository<UserAuth>, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.authRepository.findOne({email});
        if (user) {
            const isSamePasswords = await bcrypt.compare(password, user.password);
            if (isSamePasswords) {
                const user = this.userService.findByEmail(email);
                return user;
            }
        }
        return null;
    }

    async findByCond(cond: any) {
        const user = await this.userService.findOne(cond);
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    async login(user: User) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
