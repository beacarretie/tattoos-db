import { Artist } from "../../models/Artist";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ArtistFactory extends Factory<Artist>{
    protected generate():Artist{
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
            
        } as Artist;
    }
}