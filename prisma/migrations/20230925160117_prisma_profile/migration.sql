-- CreateTable
CREATE TABLE "crowdProfile" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "telNumb" TEXT,
    "description" TEXT,
    "walletBalance" INTEGER,
    "avatar" TEXT,
    "avatarID" TEXT,
    "companyName" TEXT,
    "companyLocation" TEXT,
    "companyRole" TEXT,
    "history" JSONB,

    CONSTRAINT "crowdProfile_pkey" PRIMARY KEY ("id")
);
