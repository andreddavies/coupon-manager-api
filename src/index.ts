import { app } from "@app";
import config from "@config";

app.get("/", (_, res) => {
  res.send("Hello, world");
});

app.listen(config.app.port, () => {
  console.log("Server running...");
});
