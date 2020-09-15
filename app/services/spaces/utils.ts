import { NotFoundError, SessionContext } from "@blitzjs/core"
import db, { FindOneSpaceArgs } from "db"

export async function getSpaceAsOwner(
  where: FindOneSpaceArgs["where"],
  ctx: { session?: SessionContext }
) {
  ctx.session!.authorize()

  const space = await db.space.findOne({ where: where })

  if (!space || space.ownerId !== ctx.session!.userId) {
    throw new NotFoundError()
  }

  return space
}
