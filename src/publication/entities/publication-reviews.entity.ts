import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Publication} from "./publication.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class PublicationReviews {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reviewText: string;

    @Column()
    rating: number;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @ManyToOne(() => Publication, (publication: Publication) => publication.review, { cascade: true, onDelete: "CASCADE" })
    publication: Publication;

    @ManyToOne(() => User, (user: User) => user.publicationReviews, { cascade: true, onDelete: "CASCADE" })
    reviewer: User;
}
