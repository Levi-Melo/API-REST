import { Address } from "../../entities/Address";
import { AddressModel } from "../models/addressModel";
import { IAddressRepository } from "./IAddressRepository";

export class AddressRepository implements IAddressRepository {
  async findById(id: string) {
    const foundAddress = await AddressModel.findByPk(id);

    const address: Address = {
      id: foundAddress.getDataValue("id"),
      createdAt: foundAddress.getDataValue("createdAt"),
      updatedAt: foundAddress.getDataValue("updatedAt"),
      street: foundAddress.getDataValue("street"),
      number: foundAddress.getDataValue("number"),
      district: foundAddress.getDataValue("district"),
      city: foundAddress.getDataValue("city"),
      state: foundAddress.getDataValue("state"),
      cep: foundAddress.getDataValue("cep"),
      clientId: foundAddress.getDataValue("clientId"),
    };

    return new Address(address);
  }

  async findAddressByClientId(ClientId: string) {
    ClientId.replace(/[^\d]+/g, "");
    const addresses = await AddressModel.findAll({
      where: { clientId: ClientId },
    });
    const clientAddresses = addresses.map((rowAddresses) => {
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
        clientId: rowAddresses.getDataValue("ClientId"),
      };
      return address;
    });
    return clientAddresses;
  }
  async insert(data: Address, clientId: string) {
    clientId.replace(/[^\d]+/g, "");

    const addressData: Address = {
      clientId: clientId,
      street: data.street,
      cep: data.cep,
      city: data.city,
      district: data.district,
      number: data.number,
      state: data.state,
    };
    const address = new Address(addressData);

    const createAddress = await AddressModel.create(address);
    if (createAddress.getDataValue("id")) {
      return true;
    }
    return false;
  }

  async update(id: string, data: Address) {
    const updatedAt = new Date();
    data.clientId.replace(/[^\d]+/g, "");

    const newAddressData = { ...data, updatedAt: updatedAt };

    const foundAddress = await AddressModel.findByPk(id);

    foundAddress.set(newAddressData);
    foundAddress.save();

    const updatedAddress: Address = {
      id: foundAddress.getDataValue("id"),
      createdAt: foundAddress.getDataValue("createdAt"),
      updatedAt: foundAddress.getDataValue("updatedAt"),
      street: foundAddress.getDataValue("street"),
      number: foundAddress.getDataValue("number"),
      district: foundAddress.getDataValue("district"),
      city: foundAddress.getDataValue("city"),
      state: foundAddress.getDataValue("state"),
      cep: foundAddress.getDataValue("cep"),
      clientId: foundAddress.getDataValue("clientId"),
    };
    return new Address(updatedAddress);
  }

  async delete(id: string) {
    await AddressModel.destroy({
      where: { id: id },
    });
  }
}
