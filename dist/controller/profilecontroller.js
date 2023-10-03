"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileInfo = exports.payInWithPayStack = exports.updateProfilePicture = exports.daleteProfile = exports.updateCompanyProfile = exports.viewAllProfile = exports.viewProfile = exports.createProfile = void 0;
const client_1 = require("@prisma/client");
const Uploader_1 = require("../utils/Uploader");
const axios_1 = __importDefault(require("axios"));
const errorSetUp_1 = require("../error/errorSetUp");
const https_1 = __importDefault(require("https"));
const publishConnection_1 = require("../utils/publishConnection");
const consumeConnection_1 = require("../utils/consumeConnection");
const prisma = new client_1.PrismaClient();
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { fullName, userName } = req.body;
        const profile = yield prisma.crowdProfile.create({
            data: {
                userID: id,
                email: "",
                fullName,
                userName,
                walletBalance: 0,
                history: [],
            },
        });
        (0, publishConnection_1.publishConnection)("profiled", profile);
        (0, consumeConnection_1.consumeAbegConnection)("abeg");
        return res.status(errorSetUp_1.HTTP_CODE.CREATE).json({
            message: "Your profile has been created successfully",
            data: profile,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createProfile = createProfile;
const viewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const profile = yield prisma.crowdProfile.findUnique({
            where: { id: profileID },
        });
        return res.status(errorSetUp_1.HTTP_CODE.OK).json({
            message: "profile",
            data: profile,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "Error",
        });
    }
});
exports.viewProfile = viewProfile;
const viewAllProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield prisma.crowdProfile.findMany({});
        return res.status(errorSetUp_1.HTTP_CODE.OK).json({
            message: "profile",
            data: all,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "error viewing all profile",
            data: error.message,
        });
    }
});
exports.viewAllProfile = viewAllProfile;
const updateCompanyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { profileID } = req.params;
        const { companyName, companyLocation, companyRole } = req.body;
        const updatedData = yield prisma.crowdProfile.update({
            where: { id: profileID },
            data: {
                companyName,
                companyLocation,
                companyRole,
            },
        });
        console.log("view: ", id);
        const data = yield axios_1.default
            .patch(`https://crowded-auth.onrender.com/api/${id}/update-account`, updatedData)
            .then((res) => {
            return res.data.data.profile;
        });
        console.log(updatedData);
        return res.status(errorSetUp_1.HTTP_CODE.UPDATE).json({
            message: "profile",
            data,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "error updating company info",
            data: error.message,
        });
    }
});
exports.updateCompanyProfile = updateCompanyProfile;
const daleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        yield prisma.crowdProfile.delete({
            where: { id: profileID },
        });
        return res.status(errorSetUp_1.HTTP_CODE.DELETE).json({
            message: "profile deleted",
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "Error",
        });
    }
});
exports.daleteProfile = daleteProfile;
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { profileID } = req.params;
        const { secure_url, public_id } = yield (0, Uploader_1.streamUpload)(req);
        const user = yield prisma.crowdProfile.update({
            where: { id: profileID },
            data: { avatar: secure_url, avatarID: public_id },
        });
        const data = yield axios_1.default
            .patch(`https://crowded-auth.onrender.com/api/${id}/update-account`, user)
            .then((res) => {
            return res.data.data.profile;
        });
        return res.status(errorSetUp_1.HTTP_CODE.UPDATE).json({
            message: "user avatar updated",
            data,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "Error udpating profile avatar",
            data: error.message,
        });
    }
});
exports.updateProfilePicture = updateProfilePicture;
const payInWithPayStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { amount } = req.body;
        const { profileID } = req.params;
        const find = yield prisma.crowdProfile.findUnique({
            where: { id: profileID },
        });
        const params = JSON.stringify({
            email: "peter@test.com",
            amount: parseInt(amount),
            // email: find?.email,
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                "Content-Type": "application/json",
            },
        };
        const mapWallet = yield prisma.crowdProfile.update({
            where: { id: find === null || find === void 0 ? void 0 : find.id },
            data: {
                walletBalance: (find === null || find === void 0 ? void 0 : find.walletBalance) + parseInt(amount),
            },
        });
        const user = yield axios_1.default
            .patch(`https://crowded-auth.onrender.com/api/${id}/update-account`, mapWallet)
            .then((res) => {
            return res.data.data.profile;
        });
        const ask = https_1.default
            .request(options, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(errorSetUp_1.HTTP_CODE.OK).json({
                    message: "Payment successful",
                    data: JSON.parse(data),
                    wallet: mapWallet,
                });
            });
        })
            .on("error", (error) => {
            console.error(error);
        });
        ask.write(params);
        ask.end();
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "Error making Payment",
            data: error.message,
        });
    }
});
exports.payInWithPayStack = payInWithPayStack;
const updateProfileInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { profileID } = req.params;
        const { telNumb, description } = req.body;
        const profile = yield prisma.crowdProfile.update({
            where: { id: profileID },
            data: {
                telNumb,
                description,
            },
        });
        const data = yield axios_1.default
            .patch(`https://crowded-auth.onrender.com/api/${id}/update-account`, profile)
            .then((res) => {
            return res.data.data.profile;
        });
        return res.status(errorSetUp_1.HTTP_CODE.UPDATE).json({
            message: "Updated profile Information",
            data,
        });
    }
    catch (error) {
        return res.status(errorSetUp_1.HTTP_CODE.BAD).json({
            message: "error updating profile information",
            data: error.message,
        });
    }
});
exports.updateProfileInfo = updateProfileInfo;
