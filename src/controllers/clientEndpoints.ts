import { Router } from "express";
import { Request, Response } from "express";
import { param, validationResult, checkSchema } from "express-validator";

import { isValidCnpj } from "../validators/cnpjValidator";

import {
  postClientSchema,
  updateClientSchema,
} from "../validators/checkSchemas";

import { ClientRepository } from "../data/repositories/ClientRepository";

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
  "/clients/:clientId",
  param("cnpj").custom(isValidCnpj),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to a Clients by cnpj.'
    const cnpj = req.params.clientId;
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
  "/clients/:clientId",
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
      const cnpj = req.params.clientId;
      clientRep.findByCnpj(cnpj);
      const updated = await clientRep.update(cnpj, req.body);
      res.status(200).send(updated);
    } catch (err) {
      res.status(404).send("Client not found.");
    }
  }
);

router.delete(
  "/clients/:clientId",
  param("cnpj").trim().custom(isValidCnpj),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Clients']
    // #swagger.description = 'Endpoint to delete one Client by cnpj.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const clientRep = new ClientRepository();
    const cnpj = req.params.clientId;
    try {
      await clientRep.findByCnpj(cnpj);
      clientRep.delete(cnpj);
      res.status(200).send(`deleted client.`);
    } catch (err) {
      res.status(404).send("Client not found.");
    }
  }
);
