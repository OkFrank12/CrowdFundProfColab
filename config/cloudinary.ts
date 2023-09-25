import { v2 as cloudinary } from "cloudinary";
import { environment } from "./envVariables";

cloudinary.config({
  cloud_name: environment.C_NAME,
  api_key: environment.C_KEY,
  api_secret: environment.C_KEY,
  secure: true,
});

export default cloudinary;
