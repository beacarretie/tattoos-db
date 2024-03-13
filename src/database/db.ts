import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config'
import { CreateUsersTable1710255956715 } from "./migrations/1710255956715-CreateUsersTable";
import { User } from "./../models/User";
import { CreateTasksTable1710315839201 } from "./migrations/1710315839201-CreateTasksTable";
import { Tattoo_artist } from "../models/Tattoo_artists";
import { CreateTattoosTable1710319159133 } from "./migrations/1710319159133-CreateTattoosTable";
import { CreateAppointmentsTable1710319179931 } from "./migrations/1710319179931-CreateAppointmentsTable";
import { Tattoo } from "./../models/Tattoo";
import { Appointment } from "../models/Appointment";

type database = "mysql" | "mariadb"

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Tattoo_artist, Tattoo, Appointment],
  migrations: [
    CreateUsersTable1710255956715,
    CreateTasksTable1710315839201,
    CreateTattoosTable1710319159133,
    CreateAppointmentsTable1710319179931
  ],
  synchronize: false,
  logging: false,
});

// export { AppDataSource }
