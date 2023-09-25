import { Response, NextFunction } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const streamUpload = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  return new Promise(async (resolve, reject) => {
    const uploads = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        return resolve(result);
      } else {
        return reject(error);
      }
    });

    streamifier.createReadStream(req.file?.buffer).pipe(uploads);
  });
};
