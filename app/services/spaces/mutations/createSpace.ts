import { CreateSpaceInput, CreateSpaceInputType } from "app/services/spaces/validations"
import { SessionContext } from "blitz"
import db, { PUBLIC_USER_FIELDS } from "db"

export default async function createSpace(
  input: CreateSpaceInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize()

  const { name } = CreateSpaceInput.parse(input)

  return await db.space.create({
    data: {
      name,
      owner: { connect: { id: ctx.session?.userId } },
    },
    include: {
      owner: { select: PUBLIC_USER_FIELDS },
      members: { select: PUBLIC_USER_FIELDS },
    },
  })
}
