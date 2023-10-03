"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const App_1 = require("./App");
const envVariables_1 = require("./config/envVariables");
const app = (0, express_1.default)();
(0, App_1.myApp)(app);
const port = parseInt(envVariables_1.environment.PORT);
const Server = app.listen(process.env.PORT || port, () => {
    console.log("Server listening on port");
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection", reason);
    Server.close(() => {
        process.exit(1);
    });
});
