-- CreateTable
CREATE TABLE "crowdProfile" (
    "id" STRING NOT NULL,
    "userID" STRING NOT NULL,
    "email" STRING NOT NULL,
    "fullName" STRING NOT NULL,
    "userName" STRING NOT NULL,
    "telNumb" STRING,
    "description" STRING,
    "walletBalance" INT4,
    "avatar" STRING,
    "avatarID" STRING,
    "companyName" STRING,
    "companyLocation" STRING,
    "companyRole" STRING,
    "history" JSONB,

    CONSTRAINT "crowdProfile_pkey" PRIMARY KEY ("id")
);
