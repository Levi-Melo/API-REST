import { ValidationError } from "sequelize/types";
import { Client } from "../../entities/Client";

export interface IClientRepository {
  findByCnpj(cnpj: string): Promise<Client>;
  findAll(): Promise<Client[]>;
  insert(client: Client): Promise<Client>;
  update(cnpj: string, client: Client): Promise<Client>;
  delete(cnpj: string): Promise<void>;
}
