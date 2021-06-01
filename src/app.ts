import express from "express";
import { router as clientEndpoint } from "./controllers/clientEndpoints";
import { router as addressEndpoint } from "./controllers/addressEndpoints";
import swaggerUi from "swagger-ui-express";
import { default as swaggerFile } from "../swagger_output.json";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(addressEndpoint);
app.use(clientEndpoint);
