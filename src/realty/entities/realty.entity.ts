import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Publication} from "../../publication/entities/publication.entity";
import {Image} from "./image.entity";
import {RealtyRent} from "./realty-rent.entity";
import {RealtySale} from "./realty-sale.entity";

@Entity()
export class Realty {
    @PrimaryGeneratedColumn()
    realtyId: number;

    @Column()
    numberOfRooms: number;

    @Column()
    area: number;

    @Column()
    wallMaterial: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column({nullable: true})
    minNumberOfPersons: number;

    @Column({nullable: true})
    maxNumberOfPersons: number;

    @OneToOne(() => Publication, (publication: Publication) => publication.realty)
    publication: Publication;

    @OneToMany(() => Image, (image: Image) => image.realty, {cascade: true, nullable: true})
    images: Image[] | null;

    @OneToMany(() => RealtyRent, (realtyRent: RealtyRent) => realtyRent.realty, {cascade: true, nullable: true})
    rentInfo: RealtyRent[] | null;

    @OneToOne(() => RealtySale, (realtySale: RealtySale) => realtySale.realty)
    @JoinColumn()
    saleInfo: RealtySale;
}
