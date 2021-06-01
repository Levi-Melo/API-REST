// import { Router } from "express";
// import { AddressRepository } from "../data/repositories/addressRepository";

// import { param, body, validationResult } from "express-validator";
// import { isValidCnpj } from "../validators/cnpjValidator";
// import { isValidCep } from "../validators/cepValidator";

// export const router = Router();

// router.post(
//   "/clients/:cnpj/address",
//   body("street").trim().exists(),
//   body("number").trim().exists(),
//   body("district").trim().exists(),
//   body("city").trim().exists(),
//   body("state").trim().exists(),
//   body("cep").trim().exists().custom(isValidCep),
//   param("cnpj").trim().custom(isValidCnpj),
//   (req, res) => {
//     // #swagger.tags = ['Addresses']
//     // #swagger.description = 'Endpoint to register one  Address linked to one client by cnpj.'
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const addressRep = new AddressRepository();
//     const cnpj = req.params.cnpj;
//     addressRep.insert(req.body, cnpj);
//     res.status(201).send(`created client.`);
//   }
// );

// router.patch(
//   "/clients/address/:id",
//   body("street").optional().trim(),
//   body("number").optional().trim(),
//   body("district").optional().trim(),
//   body("city").optional().trim(),
//   body("state").optional().trim(),
//   body("cep").optional().trim().custom(isValidCep),
//   param("id").isUUID(),
//   async (req, res) => {
//     // #swagger.tags = ['Addresses']
//     // #swagger.description = 'Endpoint to update any data of one Address by id.'
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const addressRep = new AddressRepository();
//       const id = req.params.id;
//       const updated = await addressRep.update(id, req.body);
//       res.status(200).send(updated);
//     } catch (err) {
//       return res.status(404).json("Address not found.");
//     }
//   }
// );

// router.delete("/clients/address/:id", param("id").isUUID(), (req, res) => {
//   // #swagger.tags = ['Addresses']
//   // #swagger.description = 'Endpoint to delete one Address by id.'
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const id = req.params.id;
//     const addressRep = new AddressRepository();
//     addressRep.delete(id);
//     res.status(200).send("deleted Address.");
//   } catch (err) {
//     return res.status(404).json("Address not found.");
//   }
// });

// router.get("/", (req, res) => {
//   // #swagger.tags = ['Documentation']
//   // #swagger.description = 'Endpoint to redirect to Documentation.'
//   res.redirect("/doc");
// });
