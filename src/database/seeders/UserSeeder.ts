import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./seeder";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
       const { ADMINS, ARTISTS, CLIENTS } = SeederConfig;
 
       const userFactory = new UserFactory();
 
       // admins
       const adminUsers = userFactory.createMany(ADMINS);
       adminUsers.forEach((user) => {
          user.role = UserRoles.ADMIN;
       });
 
       // managers
       const artistUsers = userFactory.createMany(ARTISTS);
       artistUsers.forEach((user) => {
          user.role = UserRoles.ARTIST;
       });
 
       // clients
       const clientUsers = userFactory.createMany(CLIENTS);
       clientUsers.forEach((user) => {
          user.role = UserRoles.CLIENT;
       });
 
       // save to database
       const allUsers = [...adminUsers, ...artistUsers, ...clientUsers];
       await User.save(allUsers);
    }
 }