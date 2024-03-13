import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("tattoo_artists")
export class Tattoo_artist extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  tattoo_artist!: string

  @Column()
  password!: string

  @Column()
  description!: string

  @Column()
  photo!: string

  @Column()
  role!: string;
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date
  
  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments!: Appointment[];
}