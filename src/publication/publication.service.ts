import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Realty } from '../realty/entities/realty.entity';
import { PublicationReviews } from './entities/publication-reviews.entity';
import { PublicationType } from '../shared/types';
import { ImageService } from '../shared/services/image.service';
import { RealtyService } from '../realty/realty.service';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication) private publication: Repository<Publication>,
    @InjectRepository(Realty) private realty: Repository<Realty>,
    @InjectRepository(PublicationReviews)
    private reviews: Repository<PublicationReviews>,
    private realtyService: RealtyService,
    private image: ImageService,
  ) {}

  async createUserPublication(
    createPublicationDto: CreatePublicationDto,
    photos: Array<Express.Multer.File>,
    user,
  ) {
    const photosLinks = await this.image.uploadGallery(photos);

    const createdPublication = this.publication.create({
      ...createPublicationDto,
      publicant: user,
    });
    const savedPublication = await this.publication.save(createdPublication);
    await this.realtyService.createRealtyPhotos(
      savedPublication.realty,
      photosLinks,
    );
    return savedPublication;
  }

  async findPublicationById(publicationId: number) {
    const publication = await this.publication.findOne({
      where: { publicationId },
      relations: ['realty', 'realty.images', 'publicant', 'review'],
    });
    if (publication) {
      return publication;
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }

  async findPublicationByParameter(params) {
    const { realty, ...publicationParams } = params;
    const publications = await this.publication.find({
      where: { ...publicationParams, realty: { ...realty } },
      relations: ['realty', 'realty.images'],
    });
    return publications;
  }

  async findAllPublications(limit) {
    if (limit) {
      return await this.publication.find({
        relations: ['realty', 'realty.images'],
        take: limit,
      });
    }
    return await this.publication.find({
      relations: ['realty', 'realty.images'],
    });
  }

  async findUserPublications(user: User) {
    const publications = await this.publication.find({
      where: { publicant: user },
      relations: ['realty', 'realty.images'],
    });
    return publications;
  }

  async updateUserPublication(id: number, updatePublicationDto, user: User) {
    const publication = await this.publication.findOne({
      where: { publicationId: id },
      relations: ['realty', 'realty.images'],
    });
    // console.log(publication, updatePublicationDto)

    if (publication) {
      updatePublicationDto.realty.images = [];
      // _.merge(publication, [updatePublicationDto]);
      const updatedPublication = {
        ...publication,
        ...updatePublicationDto,
        realty: {
          ...updatePublicationDto.realty,
          images: publication.realty.images,
        },
      };
      console.log(updatedPublication);
      return await this.publication.save(updatedPublication);
      // console.log(updatedPublication);
      // return '';
      // updatePublicationDto.realty.images = publication.realty.images;
      // console.log((publication.publicationTitle = 'Test2'));
      // console.log(updatedPublication);
      // return await this.publication.save(updatedPublication);
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }

  async removeUserPublication(id: number) {
    const publication = await this.publication.findOne({
      where: { publicationId: id },
      relations: ['realty'],
    });
    if (publication) {
      const realty = await this.realty.findOne({
        where: { realtyId: publication.realty.realtyId },
      });
      await this.realty.remove(realty);
      await this.publication.remove(publication);
      return publication;
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }

  async getPublicationsToBuy() {
    const publications = await this.publication.find({
      where: { publicationType: PublicationType.FOR_SELL },
      relations: ['realty', 'realty.images', 'realty.saleInfo'],
    });
    return publications;
  }

  async getPublicationsToRent() {
    //
    const publications = await this.publication.find({
      where: { publicationType: PublicationType.FOR_RENT },
      relations: ['realty', 'realty.images'],
    });
    return publications;
  }

  async createReviewOfPublication(review, user, publicationId) {
    const publication = await this.findPublicationById(publicationId);
    review.reviewer = user;
    review.publication = publication;
    const createdPublication = await this.reviews.create(review);
    return await this.reviews.save(createdPublication);
  }

  async getPublicationReviews(publicationId) {
    const publication = await this.findPublicationById(publicationId);
    if (publication) {
      const publicationReviews = await this.reviews.find({
        where: { publication: { publicationId } },
        relations: ['publication', 'reviewer'],
      });
      return publicationReviews;
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }
}
