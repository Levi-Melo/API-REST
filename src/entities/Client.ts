import { Address } from "./Address";

export class Client {
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public company: string;
  public cnpj: string;
  public contact: string;
  public telephone: string;

  public addresses?: Address[];

  constructor(
    props: Omit<Client, "createdAt" | "address">,
    createdAt?: Date,
    address?: Address[]
  ) {
    Object.assign(this, props);

    if (createdAt) {
      this.createdAt = new Date();
    }
  }
}
