import { Entity, PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany, BaseEntity } from "typeorm"
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity('students')
export class Student extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name:"user_id"})
    userID!: number;

    @Column({name:"area"})
    area!: string;

    
    //Relation: Student {1}--{1} User
    @OneToOne(()=>User,(user)=>user.id)
    @JoinColumn({name:"user_id"})
    user!:User

    //Relation Student {1}--{0..n} Students
    @OneToMany(() => Appointment, (Appointment) => Appointment.student)
    students?: Appointment[];

   
}