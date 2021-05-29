import { Router } from "express";
import { AddressRepository } from "./data/repositories/addressRepository";
import { ClientRepository } from "./data/repositories/ClientRepository";

export const router = Router();

router.get("/clients", async (req, res) => {
  const clientRep = new ClientRepository();

  try {
    const allClients = await clientRep.findAll();
    res.status(200).send(allClients);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/clients/:cnpj", async (req, res) => {
  const cnpj = req.params.cnpj;
  const clientRep = new ClientRepository();
  try {
    const foundClient = await clientRep.findByCnpj(cnpj);
    res.status(200).send(foundClient);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/clients", (req, res) => {
  const clientRep = new ClientRepository();
  const created = clientRep.insert(req.body);
  if (created) {
    res.status(200).send(`created client ${created}.`);
    return;
  }
  res.status(400).send("Unexpected Error.");
});

router.patch("/clients/:cnpj", async (req, res) => {
  const clientRep = new ClientRepository();
  const cnpj = req.params.cnpj;
  try {
    const updated = await clientRep.update(cnpj, req.body);
    res.status(200).send(updated);
  } catch (err) {
    res.status(400).send("Unexpected Error.");
  }
});

router.delete("/clients/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;
  const clientRep = new ClientRepository();
  const deleted = clientRep.delete(cnpj);
  if (deleted) {
    res.status(200).send(`deleted client ${deleted}.`);
    return;
  }
  res.status(400).send("Unexpected Error.");
});

router.post("/clients/:cnpj/address", (req, res) => {
  const addressRep = new AddressRepository();
  const cnpj = req.params.cnpj;
  const created = addressRep.insert(req.body, cnpj);
  if (created) {
    res.status(200).send(`created client ${created}.`);
    return;
  }
  res.status(400).send("Unexpected Error.");
});

router.patch("/clients/address/:id", async (req, res) => {
  const addressRep = new AddressRepository();
  const id = req.params.id;
  try {
    const updated = await addressRep.update(id, req.body);
    res.status(200).send(updated);
  } catch (err) {
    res.status(400).send("Unexpected Error.");
  }
});

router.delete("/clients/address/:id", (req, res) => {
  const id = req.params.id;
  const addressRep = new AddressRepository();
  const deleted = addressRep.delete(id);
  if (deleted) {
    res.status(200).send(`deleted client ${deleted}.`);
    return;
  }
  res.status(400).send("Unexpected Error.");
});
