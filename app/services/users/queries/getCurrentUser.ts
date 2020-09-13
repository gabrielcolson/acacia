import db from "db"
import { SessionContext } from "blitz"

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize()

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true, pictureURL: true, displayName: true },
  })

  return user
}
