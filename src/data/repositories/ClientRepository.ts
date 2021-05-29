import { Client } from "../../entities/Client";
import { Address } from "../../entities/Address";
import { AddressModel } from "../models/addressModel";
import { ClientModel } from "../models/clientModel";
import { IClientRepository } from "./IClientRepository";
import { AddressRepository } from "./addressRepository";

export class ClientRepository implements IClientRepository {
  async findAll() {
    const foundClients = await ClientModel.findAll();
    const clients: Client[] = [];
    const addressRep = new AddressRepository();

    foundClients.forEach(async (rowClient) => {
      const client: Client = {
        createdAt: rowClient.getDataValue("createdAt"),
        updatedAt: rowClient.getDataValue("updatedAt"),
        company: rowClient.getDataValue("company"),
        cnpj: rowClient.getDataValue("cnpj"),
        contact: rowClient.getDataValue("contact"),
        telephone: rowClient.getDataValue("telephone"),
      };
      clients.push(client);
    });

    for (let i = 0; i < clients.length; i++) {
      const addressesData = await addressRep.findAddressByCnpj(clients[0].cnpj);
      clients[0] = { ...clients[0], addresses: addressesData };
    }
    return clients;
  }

  async findByCnpj(cnpj: string) {
    cnpj.replace(/[^\d]+/g, "");
    const clientAddresses: Address[] = [];

    const foundClient = await ClientModel.findByPk(cnpj);
    const clientId = foundClient.getDataValue("cnpj");

    const addresses = await AddressModel.findAll({
      where: { clientId: clientId },
    });
    addresses.forEach((rowAddresses) => {
      const address: Address = {
        id: rowAddresses.getDataValue("id"),
        createdAt: rowAddresses.getDataValue("createdAt"),
        updatedAt: rowAddresses.getDataValue("updatedAt"),
        street: rowAddresses.getDataValue("street"),
        number: rowAddresses.getDataValue("number"),
        district: rowAddresses.getDataValue("district"),
        city: rowAddresses.getDataValue("city"),
        state: rowAddresses.getDataValue("state"),
        cep: rowAddresses.getDataValue("cep"),
        clientId: clientId,
      };
      clientAddresses.push(address);
    });

    const client: Client = {
      createdAt: foundClient.getDataValue("createdAt"),
      updatedAt: foundClient.getDataValue("updatedAt"),
      company: foundClient.getDataValue("company"),
      cnpj: foundClient.getDataValue("cnpj"),
      contact: foundClient.getDataValue("contact"),
      telephone: foundClient.getDataValue("telephone"),
      addresses: clientAddresses,
    };
    return new Client(client);
  }

  async insert(data: Client) {
    const formattedCnpj = data.cnpj.replace(/[^\d]+/g, "");

    const clientData: Client = {
      cnpj: formattedCnpj,
      company: data.company,
      contact: data.contact,
      telephone: data.telephone,
    };
    const client = new Client(clientData);

    const createdClient = await ClientModel.create(client);
    if (createdClient.getDataValue("cnpj")) {
      return true;
    }
    return false;
  }

  async update(cnpj: string, data: Client) {
    cnpj.replace(/[^\d]+/g, "");

    const updatedAt = new Date();
    const newClientData = { ...data, updatedAt: updatedAt };

    const foundClient = await ClientModel.findByPk(cnpj);

    foundClient.set(newClientData);
    foundClient.save();

    const client: Client = {
      createdAt: foundClient.getDataValue("createdAt"),
      updatedAt: foundClient.getDataValue("updatedAt"),
      company: foundClient.getDataValue("company"),
      cnpj: foundClient.getDataValue("cnpj"),
      contact: foundClient.getDataValue("contact"),
      telephone: foundClient.getDataValue("telephone"),
    };
    return new Client(client);
  }

  async delete(cnpj: string) {
    cnpj.replace(/[^\d]+/g, "");
    const deletedClientsNumber = await ClientModel.destroy({
      where: { cnpj: cnpj },
    });
    if (deletedClientsNumber <= 0) {
      return false;
    }
    return true;
  }
}
