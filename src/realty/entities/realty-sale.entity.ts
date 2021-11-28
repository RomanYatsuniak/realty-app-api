import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Realty } from './realty.entity';
import { BuyerAdditionalInfo } from './buyer-additional-info.entity';
import { SellerAdditionalInfo } from './seller-additional-info.entity';

@Entity()
export class RealtySale {
  @PrimaryGeneratedColumn()
  saleId: number;

  @Column()
  isSelling: boolean;

  @Column()
  price: number;

  // @OneToOne(() => User, (user: User) => user.sale)
  // buyer: User;
  @ManyToOne(() => User, (user: User) => user.sale)
  buyer: User;

  @OneToOne(() => Realty, (realty: Realty) => realty.saleInfo)
  realty: Realty;

  @OneToOne(() => BuyerAdditionalInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  buyerInfo: BuyerAdditionalInfo;

  @OneToOne(() => SellerAdditionalInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  sellerInfo: SellerAdditionalInfo;
}
