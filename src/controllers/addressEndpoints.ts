import { Router } from "express";
import { Request, Response } from "express";
import { param, validationResult, checkSchema } from "express-validator";

import {
  postAddressSchema,
  updateAddressSchema,
} from "../validators/checkSchemas";

import { AddressRepository } from "../data/repositories/addressRepository";

export const router = Router();

router.post(
  "/clients/:clientId/address",
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
