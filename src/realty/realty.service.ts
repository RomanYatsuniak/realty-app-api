import { Injectable } from '@nestjs/common';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';

@Injectable()
export class RealtyService {
  create(createRealtyDto: CreateRealtyDto) {
    return 'This action adds a new realty';
  }

  findAll() {
    return `This action returns all realty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realty`;
  }

  update(id: number, updateRealtyDto: UpdateRealtyDto) {
    return `This action updates a #${id} realty`;
  }

  remove(id: number) {
    return `This action removes a #${id} realty`;
  }

  reserveRealty() {

  }

  changeReservingRealty() {

  }

  removeReservingRealty() {

  }

  getUserReservedRealty() {

  }

  reserveToBuyRealty() {

  }

  removeFromToBuy() {

  }

  buyRealty() {

  }

  getRentingStatistics() {

  }

  getSoldRealties() {

  }

  getRentedRealtiesInfo() {

  }


}

