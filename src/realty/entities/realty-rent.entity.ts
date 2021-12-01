import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Realty } from './realty.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class RealtyRent {
  @PrimaryGeneratedColumn()
  rentId: number;

  @Column({ type: 'timestamp' })
  rentedFrom: Date;

  @Column({ type: 'timestamp' })
  rentedTo: Date;

  @Column()
  personCount: number;

  @Column()
  rentPrice: number;

  @Column()
  daysCount: number;

  @ManyToOne(() => Realty, (realty: Realty) => realty.rentInfo, { cascade: true, onDelete: "CASCADE" })
  realty: Realty;

  @ManyToOne(() => User, (user: User) => user.rent, { cascade: true, onDelete: "CASCADE" })
  tenant: User;
}
