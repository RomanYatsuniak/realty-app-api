import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {PublicationType} from "../../shared/types";
import {User} from "../../user/entities/user.entity";
import {Realty} from "../../realty/entities/realty.entity";
import {UserReviews} from "../../user/entities/user-reviews.entity";
import {UserNotes} from "../../user/entities/user-notes.entity";
import {PublicationReviews} from "./publication-reviews.entity";

@Entity()
export class Publication {
    @PrimaryGeneratedColumn()
    publicationId: number;

    @Column()
    publicationTitle: string;

    @Column()
    description: string;

    @Column()
    publicationType: PublicationType;

    @Column({default: 0})
    reviewsNumber: number;

    @Column()
    price: number;

    @ManyToOne(() => User, (user: User) => user.publication)
    publicant: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @OneToOne(() => Realty, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    realty: Realty;

    @OneToMany(() => UserNotes, (userNotes: UserNotes) => userNotes.publication, {cascade: true, nullable: true})
    notes: UserNotes[] | null;

    @OneToMany(() => PublicationReviews, (publicationReviews: PublicationReviews) => publicationReviews.publication, {cascade: true, nullable: true})
    review: PublicationReviews[] | null;

}

