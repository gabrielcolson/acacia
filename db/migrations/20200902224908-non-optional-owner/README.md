# Migration `20200902224908-non-optional-owner`

This migration has been generated by Gabriel Colson at 9/3/2020, 12:49:08 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Space" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Space" ("id", "createdAt", "updatedAt", "name", "ownerId") SELECT "id", "createdAt", "updatedAt", "name", "ownerId" FROM "Space";
DROP TABLE "Space";
ALTER TABLE "new_Space" RENAME TO "Space";
CREATE UNIQUE INDEX "Space.name_ownerId_unique" ON "Space"("name", "ownerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200902213608-add-space-model..20200902224908-non-optional-owner
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
@@ -29,10 +29,10 @@
   id        String   @default(cuid()) @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   name      String
-  owner     User?    @relation(name: "OwnedSpace", fields: [ownerId], references: [id])
-  ownerId   String?
+  owner     User     @relation(name: "OwnedSpace", fields: [ownerId], references: [id])
+  ownerId   String
   members   User[]
   @@unique([name, ownerId])
 }
```


