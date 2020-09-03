# Migration `20200903005123-add-pic-and-display-name`

This migration has been generated by Gabriel Colson at 9/3/2020, 2:51:23 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT NOT NULL,
    "pictureURL" TEXT,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
PRIMARY KEY ("id")
)

CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
)

CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" TEXT,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
PRIMARY KEY ("id")
)

CREATE TABLE "_SpaceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "User.name_unique" ON "User"("name")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Space.name_ownerId_unique" ON "Space"("name", "ownerId")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

CREATE UNIQUE INDEX "_SpaceToUser_AB_unique" ON "_SpaceToUser"("A", "B")

CREATE INDEX "_SpaceToUser_B_index" ON "_SpaceToUser"("B")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200902224908-non-optional-owner..20200903005123-add-pic-and-display-name
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = ["sqlite", "postgres"]
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,9 +16,11 @@
   id             String    @default(cuid()) @id
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
   name           String    @unique
+  displayName    String?
   email          String    @unique
+  pictureURL     String?
   hashedPassword String?
   role           String    @default("user")
   sessions       Session[]
   ownedSpaces    Space[]   @relation("OwnedSpace")
```

