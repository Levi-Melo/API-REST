import { Address } from "../../entities/Address";

export interface IAddressRepository {
  findById(id: string): Promise<Address>;
  findAddressByCnpj(cnpj: string): Promise<Address[]>;
  insert(address: Address, clientId: string): Promise<boolean>;
  update(id: string, address: Address): Promise<Address>;
  delete(id: string): Promise<boolean>;
}
