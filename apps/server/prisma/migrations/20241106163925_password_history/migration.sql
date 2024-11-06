-- CreateTable
CREATE TABLE "password-history" (
    "userId" INTEGER NOT NULL,
    "passwordHistory" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "password-history_userId_key" ON "password-history"("userId");
