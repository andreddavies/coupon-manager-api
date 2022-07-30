import express from "express";
import cors from "cors";
import "dotenv/config";

import "./database";

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

export { app };
