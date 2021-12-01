import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Realty } from './realty.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Realty, (realty: Realty) => realty.images, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  realty: Realty;
}
