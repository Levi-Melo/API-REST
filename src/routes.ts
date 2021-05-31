import { Router } from "express";
import { AddressRepository } from "./data/repositories/addressRepository";
import { ClientRepository } from "./data/repositories/ClientRepository";
import { param, body, validationResult } from "express-validator";
import { isValidCnpj } from "./controllers/cnpjValidator";
import { isValidCep } from "./controllers/cepValidator";

export const router = Router();

router.get("/clients", async (req, res) => {
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
  async (req, res) => {
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
  body("contact").trim().isEmail(),
  body("telephone").trim().isMobilePhone("pt-BR"),
  body("cnpj").custom(isValidCnpj),
  (req, res) => {
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
  body("contact").optional().trim().isEmail(),
  body("telephone").optional().trim().isMobilePhone("pt-BR"),
  body("cnpj").optional().trim().custom(isValidCnpj),
  param("cnpj").custom(isValidCnpj),
  async (req, res) => {
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
  async (req, res) => {
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
  body("street").trim().exists(),
  body("number").trim().exists(),
  body("district").trim().exists(),
  body("city").trim().exists(),
  body("state").trim().exists(),
  body("cep").trim().exists().custom(isValidCep),
  param("cnpj").trim().custom(isValidCnpj),
  (req, res) => {
    // #swagger.tags = ['Addresses']
    // #swagger.description = 'Endpoint to register one  Address linked to one client by cnpj.'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const addressRep = new AddressRepository();
    const cnpj = req.params.cnpj;
    addressRep.insert(req.body, cnpj);
    res.status(201).send(`created client.`);
  }
);

router.patch(
  "/clients/address/:id",
  body("street").optional().trim(),
  body("number").optional().trim(),
  body("district").optional().trim(),
  body("city").optional().trim(),
  body("state").optional().trim(),
  body("cep").optional().trim().custom(isValidCep),
  param("id").isUUID(),
  async (req, res) => {
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

router.delete("/clients/address/:id", param("id").isUUID(), (req, res) => {
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
});

router.get("/", (req, res) => {
  // #swagger.tags = ['Documentation']
  // #swagger.description = 'Endpoint to redirect to ocumentation.'
  res.redirect("/doc");
});
