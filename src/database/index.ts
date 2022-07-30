import mongoose from "mongoose";
import config from "@config";

const { dbHost, dbName, dbPass, dbPort, dbUser } = config.db;

mongoose.connect(
  `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`,
  (err) => {
    if (err) console.error(err);
    console.log("Sem erros na conexão com o banco.");
  }
);

mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.once("open", () =>
  console.log("Conectado ao banco de dados com sucesso!")
);
