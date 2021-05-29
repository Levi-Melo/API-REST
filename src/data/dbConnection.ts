import { Sequelize } from "sequelize";

export const dbConnection = new Sequelize("crudApi_ts", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});
