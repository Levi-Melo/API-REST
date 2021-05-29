import { uuid } from "uuidv4";

export class Address {
  public readonly id?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public street: string;
  public number: number;
  public district: string;
  public city: string;
  public state: string;
  public cep: string;
  public clientId: string;

  constructor(
    props: Omit<Address, "id" | "createdAt">,
    id?: string,
    createdAt?: Date
  ) {
    Object.assign(this, props);

    if (!id) {
      this.createdAt = new Date();
      this.id = uuid();
    }
  }
}
