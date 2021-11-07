import {Controller, Get, Request, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {AuthGuard} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  create(@Request() req, @Body() createAuthDto: CreateAuthDto) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getUserProfile(@Request() req) {
    return req.user;
  }
}
