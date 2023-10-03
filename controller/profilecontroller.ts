import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { streamUpload } from "../utils/Uploader";
import { HTTP_CODE } from "../error/errorSetUp";
import { publishConnection } from "../utils/publishConnection";

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

    publishConnection("profile", profile);
    return res.status(HTTP_CODE.UPDATE).json({
      message: "profile",
      data: profile,
    });
  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error",
      data:error
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

export const updateProfilePicture = async (req: any, res: Response) => {
  try {
    const { profileID } = req.params
    
    const { secure_url, public_id }: any = await streamUpload(req)
    const user = await prisma.crowdProfile.update({
      where: { id: profileID },
      data: { avatar: secure_url, avatarID: public_id }
    })
    
    publishConnection("profile", user);
    
    return res.status(HTTP_CODE.UPDATE).json({
      message: "user avatar updated",
      data: user
    })
  } catch (error: any) {
    return res.status(HTTP_CODE.BAD).json({
      message: "Error udpating profile",
      data: error.message
    })
  }
}

export const updateProfileInfo = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;
    const { telNumb, description } = req.body;

    const profile = await prisma.crowdProfile.update({
      where: { id: profileID },
      data: {
        telNumb,
        description
      }
    })

    publishConnection("profile", profile);

    return res.status(HTTP_CODE.UPDATE).json({
      message: "Updated profile Information",
      data: profile
    })

  } catch (error) {
    return res.status(HTTP_CODE.BAD).json({
      message: "error updating profile information",
      data: error
    })
  }
}
