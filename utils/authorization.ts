import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorizeProfileCreation = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const AccountToken = req.headers.authorization;

    if (AccountToken) {
      const newAccountToken = AccountToken.split(" ")[1];

      if (newAccountToken) {
        jwt.verify(newAccountToken, "secret", (error: any, payload: any) => {
          if (error) {
            return res.status(401).json({
              message: "Error with Token",
              data: error,
            });
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        return res.status(498).json({
          message: "Invalid Token provided",
        });
      }
    } else {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error authorizing profile creation",
      data: error,
    });
  }
};
