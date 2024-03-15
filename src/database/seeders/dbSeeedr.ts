import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ArtistSeeder } from "./ArtistSeeder";
import { ClientSeeder } from "./ClientSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new ArtistSeeder().start();
    await new ClientSeeder().start();
    await new AppointmentSeeder().start();
})()