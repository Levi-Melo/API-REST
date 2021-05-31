import express from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import { default as swaggerFile } from "../swagger_output.json";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
