import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class UserReviews {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    rating: number;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @ManyToOne(() => User, (user: User) => user.writtenReview, { cascade: true, onDelete: "CASCADE" })
    writtenBy: User;

    @ManyToOne(() => User, (user: User) => user.reviews, { cascade: true, onDelete: "CASCADE" })
    user: User;
}
