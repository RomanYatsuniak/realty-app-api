import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Realty} from "./realty.entity";

@Entity()
export class RealtySale {
    @PrimaryGeneratedColumn()
    saleId: number;

    @Column()
    isSelling: boolean

    @Column()
    price: number;

    @OneToOne(() => User, (user: User) => user.sale)
    buyerId: User

    @OneToOne(() => Realty, (realty: Realty) => realty.saleInfo)
    realty: Realty
}
