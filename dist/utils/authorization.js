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
exports.authorizeProfileCreation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizeProfileCreation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AccountToken = req.headers.authorization;
        if (AccountToken) {
            const newAccountToken = AccountToken.split(" ")[1];
            if (newAccountToken) {
                jsonwebtoken_1.default.verify(newAccountToken, "secret", (error, payload) => {
                    if (error) {
                        return res.status(401).json({
                            message: "Error with Token",
                            data: error,
                        });
                    }
                    else {
                        req.user = payload;
                        next();
                    }
                });
            }
            else {
                return res.status(498).json({
                    message: "Invalid Token provided",
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Unauthorized Access",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error authorizing profile creation",
            data: error,
        });
    }
});
exports.authorizeProfileCreation = authorizeProfileCreation;
