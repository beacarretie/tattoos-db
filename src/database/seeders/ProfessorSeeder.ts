import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./seeder";
import { Professor } from "../../models/Professor";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { ProfessorFactory } from "../factories/ProfessorFactory";


export class ProfessorSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {PROFESSORS} = SeederConfig;

        const users = await User.find(
            {
                where:{
                    role:{
                        id:2
                    }
                }
            }
        );
        const professors = new ProfessorFactory().createMany(PROFESSORS);
        professors.forEach((professor: { user: User; }) =>{
            professor.user= getRandomValueFromArray(users)
        })
        await Professor.save(professors);
    }
}