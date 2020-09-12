import { SessionContext } from "@blitzjs/core"
import db, { PUBLIC_USER_FIELDS } from "db"
import { SpaceWithUsers } from "db"

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
      owner: { select: PUBLIC_USER_FIELDS },
      members: { select: PUBLIC_USER_FIELDS },
    },
  })
}
