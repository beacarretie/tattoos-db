import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("tattoos")
export class Tattoo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  work!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  photo!: string;

  @Column()
  price!: number;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments!: Appointment[];
}