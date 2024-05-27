import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ProfessorSeeder } from "./ProfessorSeeder";
import { StudentSeeder } from "./StudentSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new ProfessorSeeder().start();
    await new StudentSeeder().start();
    // await new AppointmentSeeder().start();
})()