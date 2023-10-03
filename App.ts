import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { HTTP_CODE, mainError } from "./error/errorSetUp";
import { errorHandler } from "./error/errorBuilder";
import router from "./router/profilerouter";

export const myApp = (app: Application) => {
  try {
    app.use(express.json());
    app.use(
      cors({
        origin: ["*"],
        methods: ["GET", "POST", "DELETE", "UPDATE"],
      })
    );

    app.use(helmet());
    app.use(morgan("dev"));

    app.use("/api", router)

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "This is the API for PROFILE",
        });
      } catch (error) {
        return res.status(404).json({
          message: error,
        });
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      new mainError({
        name: "Route Error",
        message: `This is as a result of ${req.originalUrl} invalidity`,
        status: HTTP_CODE.BAD,
        success: false,
      });
    });

    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
};
