import { SeederConfig } from "../../config/seeders";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Seeder } from "./seeder";
import { Artist } from "../../models/Artist";
import { Client } from "../../models/Client";
import { getRandomValueFromArray } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";

export class AppointmentSeeder extends Seeder{
    protected async generate():Promise<void>{
        const {ARTISTS} = SeederConfig;
        const {CLIENTS}= SeederConfig;
        const {APPOINTMENTS} = SeederConfig;

        const artists= await Artist.find();
        const clients= await Client.find();

        const appointments = new AppointmentFactory().createMany(APPOINTMENTS);
        appointments.forEach((appointment: { artist: Artist; client: Client; }) =>{
            appointment.artist=getRandomValueFromArray(artists);
            appointment.client=getRandomValueFromArray(clients);
        })
        await Appointment.save(appointments);
    }
}