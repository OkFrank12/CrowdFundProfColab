import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const streamUpload = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    const uploads = cloudinary.uploader.upload_stream((error: any, result: any) => {
      if (result) {
        return resolve(result);
      } else {
        return reject(error);
      }
    });

    streamifier.createReadStream(req.file?.buffer).pipe(uploads);
  });
};
