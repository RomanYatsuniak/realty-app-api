import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ImageService } from '../shared/services/image.service';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UserReviews } from './entities/user-reviews.entity';
import { PublicationService } from '../publication/publication.service';
import { UserNotes } from './entities/user-notes.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserReviews)
    private userReviewsRepository: Repository<UserReviews>,
    @InjectRepository(UserNotes)
    private userNotesRepository: Repository<UserNotes>,
    private image: ImageService,
    private publicationService: PublicationService,
  ) {}

  async create(createUserDto: CreateUserDto, file) {
    let avatar = null;
    if (file) {
      avatar = await this.image.uploadFile(file.buffer, file.originalname);
    }
    const foundedUser = await this.findByEmailAndPhoneNumber(
      createUserDto.auth.email,
      createUserDto.phoneNumber,
    );
    if (foundedUser) {
      throw new HttpException('user already exists', HttpStatus.OK);
    } else {
      const userData = await this.userRepository.create({
        ...createUserDto,
        email: createUserDto.auth.email,
        avatarUrl: avatar,
      });
      const hashedPassword = await bcrypt.hash(userData.auth.password, 10);
      userData.auth.password = hashedPassword;
      await this.userRepository.save(userData);
      const { auth, ...response } = userData;
      return response;
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(cond) {
    const user = await this.userRepository.findOne(cond);
    return user;
  }

  async findUser(user) {
    console.log(user.id);
    const u = await this.userRepository.findOne(user.id);
    return u;
  }

  async findUserById(id) {
    return await this.userRepository.find({
      where: { id },
      relations: ['writtenReview', 'writtenReview.writtenBy'],
    });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
  async findByEmailAndPhoneNumber(email: string, phoneNumber: string) {
    const user = await this.userRepository.findOne({ email, phoneNumber });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async createReviewToUser(user: User, review: CreateUserReviewDto) {
    const { userId, ...takenReview } = review;
    const changedReview = {
      writtenBy: undefined,
      user: undefined,
      ...takenReview,
    };
    const aboutUser = await this.userRepository.findOne({ id: userId });
    changedReview.user = aboutUser;
    changedReview.writtenBy = user;
    const createdReview = await this.userReviewsRepository.create(
      changedReview,
    );
    return await this.userReviewsRepository.save(createdReview);
  }

  async getUserReviews(user: User) {
    const aboutUserReviews = await this.userReviewsRepository.find({
      where: { user },
      relations: ['writtenBy', 'user'],
    });
    return aboutUserReviews;
  }

  async getUserNotes(user: User) {
    const userNotes = await this.userNotesRepository.find({
      where: { user },
      relations: [
        'publication',
        'publication.realty',
        'publication.realty.images',
      ],
    });
    if (userNotes) {
      return userNotes;
    }
    throw new HttpException('No Notes found', HttpStatus.NOT_FOUND);
  }

  async addToNotes(user: User, publicationId: number) {
    const publicationToNote = await this.publicationService.findPublicationById(
      publicationId,
    );
    if (publicationToNote) {
      const userNote = { user, publication: publicationToNote };

      const createdUserNote = await this.userNotesRepository.create(userNote);
      return await this.userNotesRepository.save(createdUserNote);
      return [];
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }

  async removeFromNotes(publicationId: number) {
    const publication = await this.userNotesRepository.find({
      where: { publication: { publicationId } },
      relations: ['publication'],
    });
    if (publication) {
      const removedPublication = await this.userNotesRepository.remove(
        publication,
      );
      return removedPublication;
    }
    throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
  }

  async changeUserPassword() {}
}
