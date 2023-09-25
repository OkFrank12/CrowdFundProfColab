import {Router} from "express";
import { createProfile, daleteProfile, updateCompanyProfile, updateProfile, viewProfile } from "../controller/profilecontroller";
import { authorizeProfileCreation } from "../utils/authorization";


const router = Router()

router.route("/create-profile").post(authorizeProfileCreation, createProfile);

router.route("/:profileID/update-company-info").post(updateCompanyProfile);

router.route("/:profileID/view-profile").get(viewProfile);

router.route("/:profileID/update-profile").get(updateProfile);

router.route("/:profileID/delete-profile").delete(daleteProfile);

