import Sequelize from "sequelize";
import { dbConnection } from "../dbConnection";
import { ClientModel } from "./clientModel";

export const AddressModel = dbConnection.define("address", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  district: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cep: {
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

AddressModel.belongsTo(ClientModel, { as: "cnpj", foreignKey: "clientId" });
