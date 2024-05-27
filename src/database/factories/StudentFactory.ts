import { Student } from "../../models/Student";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class StudentFactory extends Factory<Student>{
    protected generate():Student{
        return{
         area: faker.location.city()
            
        } as Student;
    }
}