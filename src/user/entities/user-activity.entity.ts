import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastTimeOnline: Date;

    @OneToOne(() => User, (user: User) => user.online)
    user: User
}
