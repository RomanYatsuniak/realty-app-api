import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RealtySale } from './realty-sale.entity';
import { Publication } from '../../publication/entities/publication.entity';

@Entity()
export class BuyerAdditionalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentType: string;

  @Column({ type: 'timestamp' })
  plannedPurchasingDate: Date;

  @OneToOne(() => RealtySale, (realtySale: RealtySale) => realtySale.buyerInfo)
  realtySale: RealtySale;
}
