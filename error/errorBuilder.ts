import { Request, Response, NextFunction } from "express";
import { mainError } from "./errorSetUp";

export const errField = (err: mainError, res: Response) => {
  return res.status(404).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
    stack: err.stack,
    err,
  });
};

export const errorHandler = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errField(err, res);
};
