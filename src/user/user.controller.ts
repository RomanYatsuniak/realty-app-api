import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body('data') createUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const userInfo: CreateUserDto = JSON.parse(createUserDto);
    console.log(avatar);
    // return '';
    return await this.userService.create(userInfo, avatar);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async getUserInfo(@Request() req) {
    console.log(req.user);
    return await this.userService.findUser(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('userInfo')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getReviews')
  async getUserReviews(@Request() req) {
    return await this.userService.getUserReviews(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('notes')
  async getNotes(@Request() req) {
    return await this.userService.getUserNotes(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('notes/:id')
  async postNotes(@Request() req, @Param('id') publicationId: string) {
    return await this.userService.addToNotes(req.user, +publicationId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('notes/:id')
  async deleteNotes(@Param('id') publicationId: string) {
    return await this.userService.removeFromNotes(+publicationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('createReview')
  async createReview(
    @Request() req,
    @Body() createReviewDto: CreateUserReviewDto,
  ) {
    return await this.userService.createReviewToUser(req.user, createReviewDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.userService.remove(+id);
  // }
}
