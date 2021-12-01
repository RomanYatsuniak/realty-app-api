import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAuth } from '../../auth/entities/auth.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { UserActivity } from './user-activity.entity';
import { UserRating } from './user-rating.entity';
import { RealtySale } from '../../realty/entities/realty-sale.entity';
import { RealtyRent } from '../../realty/entities/realty-rent.entity';
import { UserReviews } from './user-reviews.entity';
import { UserNotes } from './user-notes.entity';
import { PublicationReviews } from '../../publication/entities/publication-reviews.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  phoneNumber: string;

  @Column()
  description: string;

  @OneToOne(() => UserAuth, { cascade: true })
  @JoinColumn()
  auth: UserAuth;

  @OneToOne(() => UserActivity, { cascade: true })
  @JoinColumn()
  online: Date;

  @OneToMany(
    () => Publication,
    (publication: Publication) => publication.publicant
    // ,
    // { cascade: true, nullable: true },
  )
  publication: Publication[] | null;

  @OneToOne(() => UserRating, { cascade: true })
  @JoinColumn()
  rating: UserRating;

  // @OneToOne(() => RealtySale, { cascade: true })
  // @JoinColumn()
  // sale: RealtySale;

  @OneToMany(() => RealtySale, (realtyRent: RealtySale) => realtyRent.buyer
    // , {
    // cascade: true,
    // nullable: true,
// }
)
  sale: RealtySale[] | null;

  @OneToMany(() => RealtyRent, (realtyRent: RealtyRent) => realtyRent.tenant
    // , {
    // cascade: true,
    // nullable: true,
  // }
  )
  rent: RealtyRent[] | null;

  @OneToMany(
    () => UserReviews,
    (userReviews: UserReviews) => userReviews.writtenBy
    // ,
    // { cascade: true, nullable: true },
  )
  writtenReview: UserReviews[] | null;

  @OneToMany(
    () => UserReviews,
    (userReviews: UserReviews) => userReviews.user
    // ,
    // { cascade: true, nullable: true },
  )
  reviews: UserReviews[] | null;

  @OneToMany(() => UserNotes, (userNotes: UserNotes) => userNotes.user
  //   ,
  //   {
  //   cascade: true,
  //   nullable: true,
  // }
  )
  notes: UserReviews[] | null;

  @CreateDateColumn({ type: 'timestamp' })
  registeredDate: Date;

  @OneToMany(
    () => PublicationReviews,
    (publicationReviews: PublicationReviews) => publicationReviews.reviewer,
    // { cascade: true, nullable: true},
  )
  publicationReviews: PublicationReviews[] | null;
}
