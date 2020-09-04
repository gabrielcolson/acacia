import { PrismaClient, User, Space } from "@prisma/client"
export * from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  // @ts-ignore
  globalThis["prisma"] = globalThis["prisma"] || new PrismaClient()
  // @ts-ignore
  prisma = globalThis["prisma"]
}

export type PublicUser = Pick<User, "name" | "id" | "displayName" | "pictureURL">

export const PUBLIC_USER_FIELDS: Record<keyof PublicUser, boolean> = {
  id: true,
  name: true,
  displayName: true,
  pictureURL: true,
}

export type SpaceWithUsers = Space & {
  owner: PublicUser
  members: PublicUser[]
}

export default prisma
