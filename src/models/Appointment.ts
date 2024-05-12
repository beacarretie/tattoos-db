import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Artist } from "./Artist";
import { Client } from "./Client";

@Entity('appointments')
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name:"day_date" })
    day_date!: Date;

    @Column({ name: "artist_id" })
    artistID!: number;

    @Column({name:"client_id"})
    clientID!: number;

    @Column({name:"description"})
    description!: string;

    @Column({name:"price"})
    price!: number;

    // Relation: Appointment {0..n}--{1} Artist
    @ManyToOne(()=>Artist,(artist)=>artist.id)
    @JoinColumn({name:"artist_id"})
    artist!:Artist;

    // Relation: Appointment {0..n}--{1} Client
    @ManyToOne(()=>Client,(client)=>client.id)
    @JoinColumn({name:"client_id"})
    client!:Client;

}