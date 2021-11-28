import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { Between, In, LessThan, MoreThan, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Realty } from './entities/realty.entity';
import { RealtyRent } from './entities/realty-rent.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../user/entities/user.entity';
import * as dayjs from 'dayjs';
@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(Image) private image: Repository<Image>,
    @InjectRepository(RealtyRent) private realtyRent: Repository<RealtyRent>,
    @InjectRepository(Realty) private realty: Repository<Realty>,
  ) {}
  async findOne(id: number) {
    return await this.realty.findOne({ realtyId: id });
  }

  async createRealtyPhotos(realty: Realty, links: string[]) {
    await Promise.all(
      links.map(async (link) => {
        const createdImage = this.image.create({ imageUrl: link, realty });
        await this.image.save(createdImage);
      }),
    );
  }

  async reserveRealty(
    reservation: CreateReservationDto,
    id: number,
    user: User,
  ) {
    const allReservations = await this.realtyRent.find();
    const realtyInThatDate = await this.realtyRent.find({
      //   where: [
      //     {
      //       rentedFrom: MoreThan(reservation.rentedFrom),
      //     },
      //     {
      //       rentedFrom: LessThan(reservation.rentedTo),
      //     },
      //     {
      //       rentedTo: MoreThan(reservation.rentedFrom),
      //     },
      //     {
      //       rentedTo: LessThan(reservation.rentedTo),
      //     },
      //   ],
    });
    // console.log(realtyInThatDate);
    // if (realtyInThatDate.length === 0 && allReservations.length != 0) {
    //   throw new HttpException(
    //     'Already present reservation on that date',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    const realty = await this.realty.findOne({
      where: { realtyId: id },
      relations: ['publication'],
    });
    const date1 = dayjs(reservation.rentedTo);
    const daysCount = date1.diff(reservation.rentedFrom, 'day');
    const createdReservation = await this.realtyRent.create({
      ...reservation,
      daysCount,
      realty,
      tenant: user,
      rentPrice: realty.publication.price * daysCount,
    });
    return await this.realtyRent.save(createdReservation);
  }

  removeReservingRealty() {}

  async getUserReservedRealty(user: User) {
    const reservations = await this.realtyRent.find({
      where: { tenant: user, rentedTo: MoreThan(dayjs()) },
      relations: [
        'realty',
        'tenant',
        'realty.publication',
        'realty.publication.publicant',
      ],
    });
    return reservations;
  }

  async getOwnerReservedRealty(user: User) {
    const reservations = await this.realtyRent.find({
      where: {
        realty: { publication: { publicant: user } },
        rentedTo: MoreThan(dayjs()),
      },
      relations: [
        'realty',
        'tenant',
        'realty.publication',
        'realty.publication.publicant',
      ],
    });
    return reservations;
  }

  async getOwnerReservationHistory(user: User) {
    const reservations = await this.realtyRent.find({
      where: {
        realty: { publication: { publicant: user } },
        rentedTo: LessThan(dayjs()),
      },
      relations: [
        'realty',
        'tenant',
        'realty.publication',
        'realty.publication.publicant',
      ],
    });
    return reservations;
  }

  async getClientReservationHistory(user: User) {
    const reservations = await this.realtyRent.find({
      where: { tenant: user, rentedTo: LessThan(dayjs()) },
      relations: [
        'realty',
        'tenant',
        'realty.publication',
        'realty.publication.publicant',
      ],
    });
    return reservations;
  }

  async getRentingStatistics(user: User) {
    const reservations = (await this.getOwnerReservationHistory(
      user,
    )) as RealtyRent[];
    let sumCostForAllTime = 0;
    console.log(reservations);
    const month = {};
    reservations.forEach((real) => {
      const date = dayjs(real.rentedFrom).format('YYYY/MM');
      const existOnDates = Object.keys(month).find((d) => d === date);
      if (existOnDates) {
        month[date].price += real.rentPrice;
        month[date].count += 1;
      } else {
        month[date] = {};
        month[date].price = real.rentPrice;
        month[date].count = 1;
      }

      sumCostForAllTime += real.rentPrice;
    });
    return {
      monthStatistics: { ...month },
      sumCostForAllTime,
      reservationCountOfAllTime: reservations.length,
    };
  }

  buyRealty() {}

  giveInfoToBuyer() {}

  giveInfoToSeller() {}

  getInfoFromBuyer() {}

  getInfoFromSeller() {}

  getMyPurchaseList() {}

  getMySellingList() {}
}
