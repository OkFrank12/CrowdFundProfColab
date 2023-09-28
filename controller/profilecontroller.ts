import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { streamUpload } from "../utils/Uploader";
import { HTTP_CODE } from "../error/errorSetUp";
// import { publishConnection } from "../utils/connection";

const prisma = new PrismaClient();

export const createProfile = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const { fullName, userName } = req.body;

    const profile = await prisma.crowdProfile.create({
      data: {
        email: "email",
        userID: id,

        fullName,
        userName,

        walletBalance: 0,
        history: [],
      },
    });

    publishConnection("profile", profile);

    return res.status(HTTP_CODE.CREATE).json({
      message: "Your profile has been created successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error",
      data: error,
    });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const profile = await prisma.crowdProfile.findUnique({
      where: { id: profileID },
    });
    return res.status(HTTP_CODE.OK).json({
      message: "profile",
      data: profile,
    });
  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error",
    });
  }
};

export const updateCompanyProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;
    const { companyName, companyLocation, companyRole } = req.body;

    const profile = await prisma.crowdProfile.update({
      where: { id: profileID },
      data: {
        companyName,
        companyLocation,
        companyRole,
      },
    });
    return res.status(HTTP_CODE.UPDATE).json({
      message: "profile",
      data: profile,
    });
  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error",
    });
  }
};

export const daleteProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    await prisma.crowdProfile.delete({
      where: { id: profileID },
    });
    return res.status(HTTP_CODE.DELETE).json({
      message: "profile deleted",
    });
  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error",
    });
  }
};
