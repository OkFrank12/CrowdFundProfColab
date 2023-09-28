import express from "express";
import {
  createProfile,
  daleteProfile,
  updateCompanyProfile,
  updateProfileInfo,
  viewProfile,
} from "../controller/profilecontroller";

const router = express.Router();

router.route("/create-profile").post(createProfile);
router.route("/view-profile").get(viewProfile);
router.route("/:profileID/update-company-profile").patch(updateCompanyProfile);
router.route("/:profileID/update-company-info").patch(updateProfileInfo);
router.route("/:profileID/delete-profile").delete(daleteProfile);

export default router;
