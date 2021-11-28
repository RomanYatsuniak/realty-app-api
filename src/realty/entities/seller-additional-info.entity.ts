import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RealtyRent } from './realty-rent.entity';
import { RealtySale } from './realty-sale.entity';

@Entity()
export class SellerAdditionalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registrationNumber: string;

  @Column({ nullable: true })
  flourNumber: number;

  @Column()
  streetName: string;

  @Column()
  buildingNumber: number;

  @Column()
  realtyCondition: string;

  @OneToOne(() => RealtySale, (realtySale: RealtySale) => realtySale.sellerInfo)
  realtySale: RealtySale;
}
