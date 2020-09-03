import { SessionContext } from "@blitzjs/core"
import db from "db"

export default async function getMySpaces(_ = null, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize()

  return await db.space.findMany({
    where: {
      OR: [{ ownerId: ctx.session!.userId }, { members: { some: { id: ctx.session!.userId } } }],
    },
    include: {
      owner: { select: { name: true, id: true, pictureURL: true, displayName: true } },
      members: { select: { name: true, id: true, pictureURL: true, displayName: true } },
    },
  })
}
