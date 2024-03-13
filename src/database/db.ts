import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: 3307,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "tattoos",
  entities: [],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  synchronize: false,
  logging: false,
});
