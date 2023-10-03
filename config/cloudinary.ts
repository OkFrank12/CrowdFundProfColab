import { v2 as cloudinary } from "cloudinary";
import { environment } from "./envVariables";

cloudinary.config({
  cloud_name: "degla0zb1",
  api_key: "315717186575357",
  api_secret: "g_80cUrIPd8mXZ0x2y18SDHrGu4",
  secure: true
});

export default cloudinary;
