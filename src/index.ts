import { app } from "@app";
import config from "@config";
import { errorMiddleware } from "@middlewares/error";

app.get("/", (_, res) => {
  res.send("Hello, world");
});

app.use(errorMiddleware);

app.listen(config.app.port, () => {
  console.log("Servidor rodando...");
});
