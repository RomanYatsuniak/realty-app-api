import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Publication} from "../../publication/entities/publication.entity";

@Entity()
export class UserNotes {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @ManyToOne(() => User, (user: User) => user.notes, { cascade: true, onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Publication, (publication: Publication) => publication.notes, { cascade: true, onDelete: "CASCADE" })
    publication: Publication;

}
