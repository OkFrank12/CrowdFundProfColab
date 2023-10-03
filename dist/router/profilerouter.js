"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profilecontroller_1 = require("../controller/profilecontroller");
const authorization_1 = require("../utils/authorization");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const myUploader = (0, multer_1.default)().single("avatar");
router.route("/create-profile").post(authorization_1.authorizeProfileCreation, profilecontroller_1.createProfile);
router
    .route("/:profileID/update-company-info")
    .patch(authorization_1.authorizeProfileCreation, profilecontroller_1.updateCompanyProfile);
router.route("/:profileID/view-profile").get(profilecontroller_1.viewProfile);
router.route("/all").get(profilecontroller_1.viewAllProfile);
router
    .route("/:profileID/update-profile")
    .patch(authorization_1.authorizeProfileCreation, profilecontroller_1.updateProfileInfo);
router.route("/:profileID/delete-profile").delete(profilecontroller_1.daleteProfile);
router
    .route("/:profileID/update-profile-pics")
    .patch(authorization_1.authorizeProfileCreation, myUploader, profilecontroller_1.updateProfilePicture);
router
    .route("/:profileID/pay-in")
    .patch(authorization_1.authorizeProfileCreation, profilecontroller_1.payInWithPayStack);
exports.default = router;
