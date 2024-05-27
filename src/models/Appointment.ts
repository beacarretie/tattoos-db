import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Professor } from "./Professor";
import { Student } from "./Student";

@Entity('appointments')
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name:"day_date" })
    day_date!: Date;

    @Column({ name: "professor_id" })
    professorID!: number;

    @Column({name:"student_id"})
    studentID!: number;

    @Column({name:"description"})
    description!: string;

    @Column({name:"price"})
    price!: number;

    // Relation: Appointment {0..n}--{1} Professor
    @ManyToOne(()=>Professor,(professor)=>professor.id)
    @JoinColumn({name:"professor"})
    professor!:Professor;

    // Relation: Appointment {0..n}--{1} Student
    @ManyToOne(()=>Student,(student)=>student.id)
    @JoinColumn({name:"student_id"})
    student!:Student;

}