"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const errorSetUp_1 = require("./error/errorSetUp");
const errorBuilder_1 = require("./error/errorBuilder");
const profilerouter_1 = __importDefault(require("./router/profilerouter"));
const myApp = (app) => {
    try {
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: ["*"],
            methods: ["GET", "POST", "DELETE", "UPDATE"],
        }));
        app.use((0, helmet_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use("/api", profilerouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "This is the API for PROFILE",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: error,
                });
            }
        });
        app.all("*", (req, res, next) => {
            new errorSetUp_1.mainError({
                name: "Route Error",
                message: `This is as a result of ${req.originalUrl} invalidity`,
                status: errorSetUp_1.HTTP_CODE.BAD,
                success: false,
            });
        });
        app.use(errorBuilder_1.errorHandler);
    }
    catch (error) {
        console.log(error);
    }
};
exports.myApp = myApp;
