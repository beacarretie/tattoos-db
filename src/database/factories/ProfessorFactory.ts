import {Professor } from "../../models/Professor";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ProfessorFactory extends Factory<Professor>{
    protected generate():Professor{
        return{
            style: faker.helpers.arrayElement([
                "Neotraditional",
                "Traditional",
                "Trashpolka",
                "Japanese",
                "Blackworks",
                "Minimalist",
                "Realism"
            ]),
            area: faker.location.city()
            
        } as Professor;
    }
}