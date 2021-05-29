import Sequelize from "sequelize";
import { dbConnection } from "../dbConnection";

export const ClientModel = dbConnection.define("clients", {
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
