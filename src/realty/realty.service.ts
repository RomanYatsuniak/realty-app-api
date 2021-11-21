import { Injectable } from '@nestjs/common';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Realty } from './entities/realty.entity';
import { RealtyRent } from './entities/realty-rent.entity';

@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(Image) private image: Repository<Image>,
    @InjectRepository(RealtyRent) private realtyRent: Repository<RealtyRent>,
  ) {}
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

  async createRealtyPhotos(realty: Realty, links: string[]) {
    await Promise.all(
      links.map(async (link) => {
        const createdImage = this.image.create({ imageUrl: link, realty });
        await this.image.save(createdImage);
      }),
    );
  }

  reserveRealty() {}

  removeReservingRealty() {}

  getUserReservedRealty() {}

  getOwnerReservedRealty() {}

  // reserveToBuyRealty() {}
  //
  // removeFromToBuy() {}

  buyRealty() {}

  getRentingStatistics() {}

  getSoldRealties() {}

  getRentedRealtiesInfo() {}
}
