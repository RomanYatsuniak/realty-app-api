import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class UserRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    positiveRating: number;

    @Column()
    negativeRating: number;

    @OneToOne(() => User, (user: User) => user.rating)
    user: User
}
