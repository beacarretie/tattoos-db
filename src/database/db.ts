import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "./../models/User";
import { Tattoo_artist } from "../models/Tattoo_artists";
import { Tattoo } from "./../models/Tattoo";
import { Appointment } from "../models/Appointment";
import { CreateRolesTable1710438273869 } from "./migrations/1710438273869-CreateRolesTable";
import { CreateUsersTable1710438289831 } from "./migrations/1710438289831-CreateUsersTable";
import { CreateTattoosTable1710438305368 } from "./migrations/1710438305368-CreateTattoosTable";
import { CreateArtistsTable1710438342748 } from "./migrations/1710438342748-CreateArtistsTable";
import { CreateAppointmentsTable1710438367212 } from "./migrations/1710438367212-CreateAppointmentsTable";

type database = "mysql" 

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST,
  port: 3307,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Tattoo_artist, Tattoo, Appointment],
  migrations: [
    CreateRolesTable1710438273869,
    CreateUsersTable1710438289831,
    CreateTattoosTable1710438305368,
    CreateArtistsTable1710438342748,
    CreateAppointmentsTable1710438367212,
  ],
  synchronize: false,
  logging: false,
});

export default AppDataSource;
// export { AppDataSource }