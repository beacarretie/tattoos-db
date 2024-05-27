import { Student } from "../../models/Student";
import { Seeder } from "./seeder";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { StudentFactory } from "../factories/StudentFactory";

export class StudentSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {STUDENTS} = SeederConfig;

        const users =await User.find(
            {
                where:{
                    role:{
                        id:3
                    }
                }
            }
        );
        const students = new StudentFactory().createMany(STUDENTS);
        students.forEach((student: { user: User; })=>{
            student.user=getRandomValueFromArray(users)
        })
        await Student.save(students);
    } 
}