import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Realty} from "./realty.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class RealtyRentEntity {
    @PrimaryGeneratedColumn()
    rentId: number;

    @Column()
    rentedFrom: Date;

    @Column()
    rentedTo: Date;

    @Column()
    personCount: number;

    @Column()
    rentPrice: number;

    @ManyToOne(() => Realty, (realty: Realty) => realty.rentInfo)
    realty: Realty;

    @ManyToOne(() => User, (user: User) => user.rent)
    tenant: User;
}
