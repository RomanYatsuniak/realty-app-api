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
import { RealtySale } from './entities/realty-sale.entity';
import { BuyerAdditionalInfo } from './entities/buyer-additional-info.entity';
import { SellerAdditionalInfo } from './entities/seller-additional-info.entity';
import useRealTimers = jest.useRealTimers;
import { CreateInfoToBuyerDto } from './dto/create-info-to-buyer.dto';
import { CreateInfoToSellerDto } from './dto/create-info-to-seller.dto';
@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(Image) private image: Repository<Image>,
    @InjectRepository(RealtyRent) private realtyRent: Repository<RealtyRent>,
    @InjectRepository(Realty) private realty: Repository<Realty>,
    @InjectRepository(RealtySale) private realtySale: Repository<RealtySale>,
    @InjectRepository(SellerAdditionalInfo)
    private sellerInfo: Repository<SellerAdditionalInfo>,
    @InjectRepository(BuyerAdditionalInfo)
    private buyerInfo: Repository<BuyerAdditionalInfo>,
  ) {}
  async findOne(id: number) {
    const realty = await this.realty.findOne({ realtyId: id });
    if (realty) {
      return realty;
    } else {
      throw new HttpException(
        'Realty with this id is not exist',
        HttpStatus.NOT_FOUND,
      );
    }
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
      where: [
        { rentedFrom: Between(reservation.rentedFrom, reservation.rentedTo) },
        { rentedTo: Between(reservation.rentedFrom, reservation.rentedTo) },
      ],
    });
    if (realtyInThatDate.length !== 0 && allReservations.length != 0) {
      throw new HttpException(
        'Already present reservation on that date',
        HttpStatus.NOT_FOUND,
      );
    }
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

  async removeReservingRealty(id: number, user: User) {
    const removedRealty = await this.realtyRent.findOne({ rentId: id });
    await this.realtyRent.delete({ rentId: id });
    return removedRealty;
  }

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
    const month = [];
    reservations.forEach((real) => {
      const date = dayjs(real.rentedFrom).format('YYYY/MM');
      const index = month.findIndex((m) => m.date === date);
      if (index >= 0) {
        month[index].price += real.rentPrice;
        month[index].count += 1;
      } else {
        month.push({ date, price: real.rentPrice, count: 1 });
      }

      sumCostForAllTime += real.rentPrice;
    });
    return {
      monthStatistics: month,
      sumCostForAllTime,
      reservationCountOfAllTime: reservations.length,
    };
  }

  async buyRealty(id: number, user: User) {
    const realty = await this.realty.findOne(id, {
      relations: ['publication'],
    });

    if (realty.publication.publicationType === 'rent') {
      throw new HttpException(
        'Can buy only realty of selling type',
        HttpStatus.NOT_FOUND,
      );
    }
    const realtyForCreation = await this.realtySale.create({
      price: realty.publication.price,
      realty,
      isSelling: false,
      buyer: user,
    });
    return await this.realtySale.save(realtyForCreation);
  }

  async giveInfoToBuyer(
    user: User,
    saleId: number,
    infoToBuyerDto: CreateInfoToBuyerDto,
  ) {
    const saleById = await this.realtySale.findOne(saleId);
    const createdInfoForBuyer = await this.sellerInfo.create({
      ...infoToBuyerDto,
      realtySale: saleById,
    });
    return await this.sellerInfo.save(createdInfoForBuyer);
  }

  async giveInfoToSeller(
    user: User,
    saleId: number,
    infoToSellerDto: CreateInfoToSellerDto,
  ) {
    const saleById = await this.realtySale.findOne(saleId);
    const createdInfoForSeller = await this.buyerInfo.create({
      ...infoToSellerDto,
      realtySale: saleById,
    });
    return await this.buyerInfo.save(createdInfoForSeller);
  }

  async getInfoFromBuyer(user: User, saleId: number) {
    return await this.sellerInfo.find({
      where: { realtySale: { saleId } },
      relations: ['realtySale'],
    });
  }

  async getInfoFromSeller(user: User, saleId: number) {
    return await this.buyerInfo.find({
      where: { realtySale: { saleId } },
      relations: ['realtySale'],
    });
  }

  async getMyPurchaseList(user: User) {
    return await this.realtySale.find({
      where: { buyer: user },
      relations: ['buyer', 'realty', 'realty.publication'],
    });
  }

  async getMySellingList(user: User) {
    return await this.realtySale.find({
      where: { realty: { publication: { publicant: user } } },
      relations: ['buyer', 'realty', 'realty.publication'],
    });
  }
}
