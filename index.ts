import express, { Application } from "express";
import { myApp } from "./App";
import { environment } from "./config/envVariables";

const app: Application = express();
myApp(app);
const port: number = parseInt(environment.PORT);

const Server = app.listen(process.env.PORT || port, () => {
  console.log("Server listening on port");
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);
  Server.close(() => {
    process.exit(1);
  });
});
