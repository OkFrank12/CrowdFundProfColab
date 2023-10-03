import express from "express";
import {
  createProfile,
  daleteProfile,
  updateCompanyProfile,
  updateProfileInfo,
  updateProfilePicture,
  viewProfile,
} from "../controller/profilecontroller";
import { authorizeProfileCreation } from "../utils/authorization";
import multer from "multer";

const router = express.Router();
const myUploader = multer().single("avatar");

router.route("/create-profile").post(authorizeProfileCreation, createProfile);

router
  .route("/:profileID/update-company-info")
  .patch(authorizeProfileCreation, updateCompanyProfile);

router.route("/:profileID/view-profile").get(viewProfile);

router
  .route("/:profileID/update-profile")
  .patch(authorizeProfileCreation, updateProfileInfo);

router.route("/:profileID/delete-profile").delete(daleteProfile);

router
  .route("/:profileID/update-profile-pics")
  .patch(authorizeProfileCreation, myUploader, updateProfilePicture);

export default router;
