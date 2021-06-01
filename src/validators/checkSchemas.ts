import { Schema } from "express-validator";
import { isValidCnpj } from "./cnpjValidator";

export const postClientSchema: Schema = {
  cnpj: {
    in: "body",
    optional: { options: { nullable: false } },
    custom: {
      options: isValidCnpj,
    },
  },
  contact: {
    in: "body",
    optional: { options: { nullable: false } },
    isEmail: {
      bail: true,
    },
  },
  telephone: {
    in: "body",
    optional: { options: { nullable: false } },
    isMobilePhone: {
      bail: true,
      options: [["pt-BR"]],
    },
  },
};

export const updateClientSchema: Schema = {
  clientId: {
    in: "params",
    custom: {
      options: isValidCnpj,
    },
  },
  cnpj: {
    in: "body",
    optional: { options: { nullable: true } },
    custom: {
      options: isValidCnpj,
    },
  },
  contact: {
    in: "body",
    optional: { options: { nullable: true } },
    isEmail: {
      bail: true,
    },
  },
  telephone: {
    in: "body",
    optional: { options: { nullable: true } },
    isMobilePhone: {
      bail: true,
      options: [["pt-BR"]],
    },
  },
};

export const postAddressSchema: Schema = {
  street: {
    in: "body",
    optional: { options: { nullable: false } },
  },
  number: {
    in: "body",
    optional: { options: { nullable: false } },
  },
  district: {
    in: "body",
    optional: { options: { nullable: false } },
  },
  city: {
    in: "body",
    optional: { options: { nullable: false } },
  },
  state: {
    in: "body",
    optional: { options: { nullable: false } },
  },
  cep: {
    in: "body",
    optional: { options: { nullable: false } },
    isPostalCode: {
      bail: true,
      options: "BR",
    },
  },
  clientId: {
    in: "body",
    optional: { options: { nullable: false } },
    custom: {
      options: isValidCnpj,
    },
  },
};

export const updateAddressSchema: Schema = {
  id: {
    in: "params",
    optional: { options: { nullable: false } },
    isUUID: {
      bail: true,
    },
  },
  street: {
    in: "body",
    optional: { options: { nullable: true } },
  },
  number: {
    in: "body",
    optional: { options: { nullable: true } },
  },
  district: {
    in: "body",
    optional: { options: { nullable: true } },
  },
  city: {
    in: "body",
    optional: { options: { nullable: true } },
  },
  state: {
    in: "body",
    optional: { options: { nullable: true } },
  },
  cep: {
    in: "body",
    optional: { options: { nullable: true } },
    isPostalCode: {
      bail: true,
      options: "BR",
    },
  },
  clientId: {
    in: "body",
    optional: { options: { nullable: true } },
    custom: {
      options: isValidCnpj,
    },
  },
};
