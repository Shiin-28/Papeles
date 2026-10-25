-- CreateTable
CREATE TABLE "WaitReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceSlug" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "waitMinutes" INTEGER NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "ipHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OutdatedFlag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceSlug" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemId" TEXT,
    "message" TEXT,
    "ipHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "WaitReport_serviceSlug_visitDate_idx" ON "WaitReport"("serviceSlug", "visitDate");

-- CreateIndex
CREATE INDEX "WaitReport_ipHash_createdAt_idx" ON "WaitReport"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "OutdatedFlag_serviceSlug_status_idx" ON "OutdatedFlag"("serviceSlug", "status");

-- CreateIndex
CREATE INDEX "OutdatedFlag_ipHash_createdAt_idx" ON "OutdatedFlag"("ipHash", "createdAt");
