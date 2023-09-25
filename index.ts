import express, { Application } from 'express';



import cors from "cors";


const port: number = 2311;
const app: Application = express()

app.use(cors());
app.use(express.json());

// app.use("/api", profile);
app.listen(port, () => {
  console.log();
  console.log("Profile Service connected...");
});