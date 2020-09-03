import { SessionContext } from "@blitzjs/core"
import db from "db"
import { SpaceWithUsers } from "app/services/spaces/types"

export default async function getMySpaces(
  _ = null,
  ctx: { session?: SessionContext } = {}
): Promise<SpaceWithUsers[]> {
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
