import {Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import {AuthGuard} from "@nestjs/passport";
import {User} from "../user/entities/user.entity";
import {CreateUserReviewDto} from "../user/dto/create-user-review.dto";
import {CreatePublicationReviewDto} from "./dto/create-publication-review.dto";

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto, @Request() req) {
    return await this.publicationService.createUserPublication(createPublicationDto, req.user);
  }
  //
  // @Get()
  // findAll() {
  //   return this.publicationService.findAll();
  // }
  //
  @Get('')
  async findAll(@Query() query) {
    return await this.publicationService.findAllPublications(query.limit);
  }
  @Get('find')
  async findByParameter(@Body() body) {
    return await this.publicationService.findPublicationByParameter(body);
  }

  @Get('find/rent')
  async findRentingRealty() {
    return await this.publicationService.getPublicationsToRent();
  }
  @Get('find/sell')
  async findSellingRealty() {
    return await this.publicationService.getPublicationsToBuy();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findAllUserPublication(@Request() req) {
    return await this.publicationService.findUserPublications((req.user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/review')
  async getPublicationReviews(@Param('id') publicationId: string) {
    const reviews = await this.publicationService.getPublicationReviews(+publicationId);
    return reviews;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/review')
  async createPublicationReview(@Param('id') publicationId: string, @Body() createReviewDto: CreatePublicationReviewDto, @Request() req) {
    const review = await this.publicationService.createReviewOfPublication(createReviewDto, req.user, +publicationId);
    return review;
  }



  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return await this.publicationService.updateUserPublication(+id, updatePublicationDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.publicationService.findPublicationById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.removeUserPublication(+id);
  }
}
