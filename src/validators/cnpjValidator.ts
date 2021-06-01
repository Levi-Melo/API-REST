import { CustomValidator } from "express-validator";

export const isValidCnpj: CustomValidator = (value) => {
  const cnpj = value.replace(/[^\d]+/g, "");
  if (cnpj.length != 14) return Promise.reject(`CNPJ with invalid size`);

  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  ) {
    return Promise.reject("CNPJ on black List");
  }

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let soma = 0;
  let result = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    soma += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (result != digits.charAt(0)) {
    return Promise.reject("Invalid check digits of CNPJ");
  }

  size = size + 1;
  numbers = cnpj.substring(0, size);
  soma = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    soma += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (result != digits.charAt(1)) {
    return Promise.reject("Invalid check digits of CNPJ");
  }
  return true;
};
