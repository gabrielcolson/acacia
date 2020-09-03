# Migration `20200902211300-remove-nullable-name`

This migration has been generated by Gabriel Colson at 9/2/2020, 11:13:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
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

CREATE UNIQUE INDEX "User.name_unique" ON "User"("name")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200902161610-add-user-model..20200902211300-remove-nullable-name
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
@@ -15,9 +15,9 @@
 model User {
   id             String    @default(cuid()) @id
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
-  name           String?
+  name           String    @unique
   email          String    @unique
   hashedPassword String?
   role           String    @default("user")
   sessions       Session[]
```

