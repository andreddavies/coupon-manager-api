import { app } from "@app";
import config from "@config";
import { errorMiddleware } from "@middlewares/error";

app.use(errorMiddleware);

app.listen(config.app.port, () => {
  console.log("Servidor rodando...");
});
