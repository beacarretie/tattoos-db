import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./seeder";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
       const { ADMINS, PROFESSORS, STUDENTS } = SeederConfig;
 
       const userFactory = new UserFactory();
 
       // admins
       const adminUsers = userFactory.createMany(ADMINS);
       adminUsers.forEach((user) => {
          user.role = UserRoles.ADMIN;
       });
 
       // managers
       const professorUsers = userFactory.createMany(PROFESSORS);
       professorUsers.forEach((user) => {
          user.role = UserRoles.PROFESSOR;
       });
 
       // students
       const studentUsers = userFactory.createMany(STUDENTS);
       studentUsers.forEach((user) => {
          user.role = UserRoles.STUDENT;
       });
 
       // save to database
       const allUsers = [...adminUsers, ...professorUsers, ...studentUsers];
       await User.save(allUsers);
    }
 }