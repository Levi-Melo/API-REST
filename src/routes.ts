import { Router } from "express";
import { Request, Response } from "express";
import { param, validationResult, checkSchema } from "express-validator";

import { isValidCnpj } from "./validators/cnpjValidator";
import {
  postAddressSchema,
  postClientSchema,
  updateAddressSchema,
  updateClientSchema,
} from "./validators/checkSchemas";

import { AddressRepository } from "./data/repositories/addressRepository";
import { ClientRepository } from "./data/repositories/ClientRepository";

export const router = Router();

router.get("/clients", async (req: Request, res: Response) => {
  // #swagger.tags = ['Clients']
  // #swagger.description = 'Endpoint to get all Clients.'
  const clientRep = new ClientRepository();
  try {
    const allClients = await clientRep.findAll();
    res.status(200).send(allClients);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get(
  "/clients/:cnpj",
  param("cnpj").custom(isValidCnpj),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to a Clients by cnpj.'
    const cnpj = req.params.cnpj;
    const clientRep = new ClientRepository();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const foundClient = await clientRep.findByCnpj(cnpj);
      res.status(200).send(foundClient);
    } catch (err) {
      res.status(404).send("Client not found.");
    }
  }
);

router.post(
  "/clients",
  checkSchema(postClientSchema),
  (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to register one Client.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const clientRep = new ClientRepository();
    clientRep.insert(req.body).then();
    res.status(201).send(`created client.`);
  }
);

router.patch(
  "/clients/:cnpj",
  checkSchema(updateClientSchema),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to update any data of one Client.'
    const clientRep = new ClientRepository();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const cnpj = req.params.cnpj;
      clientRep.findByCnpj(cnpj);
      const updated = await clientRep.update(cnpj, req.body);
      res.status(200).send(updated);
    } catch (err) {
      res.status(404).send("Client not found.");
    }
  }
);

router.delete(
  "/clients/:cnpj",
  param("cnpj").trim().custom(isValidCnpj),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to delete one Client by cnpj.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const clientRep = new ClientRepository();
    const cnpj = req.params.cnpj;
    try {
      await clientRep.findByCnpj(cnpj);
      clientRep.delete(cnpj);
      res.status(200).send(`deleted client.`);
    } catch (err) {
      res.status(404).send("Client not found.");
    }
  }
);

router.post(
  "/clients/:cnpj/address",
  checkSchema(postAddressSchema),
  (req: Request, res: Response) => {
    // #swagger.tags = ['Addresses']
    // #swagger.description = 'Endpoint to register one  Address linked to one client by cnpj.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const addressRep = new AddressRepository();
    addressRep.insert(req.body, req.params.clientId);
    res.status(201).send(`created client.`);
  }
);

router.patch(
  "/clients/address/:id",
  checkSchema(updateAddressSchema),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Addresses']
    // #swagger.description = 'Endpoint to update any data of one Address by id.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const addressRep = new AddressRepository();
      const id = req.params.id;
      const updated = await addressRep.update(id, req.body);
      res.status(200).send(updated);
    } catch (err) {
      return res.status(404).json("Address not found.");
    }
  }
);

router.delete(
  "/clients/address/:id",
  param("id").isUUID(),
  (req: Request, res: Response) => {
    // #swagger.tags = ['Addresses']
    // #swagger.description = 'Endpoint to delete one Address by id.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params.id;
      const addressRep = new AddressRepository();
      addressRep.delete(id);
      res.status(200).send("deleted Address.");
    } catch (err) {
      return res.status(404).json("Address not found.");
    }
  }
);

router.get("/", (req: Request, res: Response) => {
  // #swagger.tags = ['Documentation']
  // #swagger.description = 'Endpoint to redirect to documentation.'
  res.redirect("/doc");
});
