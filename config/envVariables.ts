import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT!,
  C_NAME: process.env.C_NAME,
  C_KEY: process.env.C_KEY,
  C_SECRET: process.env.C_SECRET,
};
