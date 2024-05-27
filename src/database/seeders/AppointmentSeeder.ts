import { SeederConfig } from "../../config/seeders";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Seeder } from "./seeder";
import { Professor } from "../../models/Professor";
import { Student } from "../../models/Student";
import { getRandomValueFromArray } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";

export class AppointmentSeeder extends Seeder{
    protected async generate():Promise<void>{
        const {PROFESSORS} = SeederConfig;
        const {STUDENTS}= SeederConfig;
        const {APPOINTMENTS} = SeederConfig;

        const professors= await Professor.find();
        const students= await Student.find();

        const appointments = new AppointmentFactory().createMany(APPOINTMENTS);
        appointments.forEach((appointment: { professor: Professor; student: Student; }) =>{
            appointment.professor=getRandomValueFromArray(professors);
            appointment.student=getRandomValueFromArray(students);
        })
        await Appointment.save(appointments);
    }
}