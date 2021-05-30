import { CustomValidator } from "express-validator";

export const isValidCep: CustomValidator = (value) => {
  const cep = value.replace(/\D/g, "");

  if (cep == "") {
    return Promise.reject("CEP can't be undefined");
  }
  const regex = /^[0-9]{8}$/;
  if (!regex.test(cep)) {
    return Promise.reject("Invalid CEP");
  }
  return true;
};
