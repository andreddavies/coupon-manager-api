import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config";

import "./database";
import router from "@routes/router";

const app: express.Application = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

export { app };
