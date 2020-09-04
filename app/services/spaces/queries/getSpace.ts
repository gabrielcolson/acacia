import { NotFoundError, SessionContext } from "blitz"
import { GetSpaceInput, GetSpaceInputType } from "app/services/spaces/validations"
import db, { PUBLIC_USER_FIELDS } from "db"

export default async function getSpace(
  input: GetSpaceInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { user: userName, space: spaceName } = GetSpaceInput.parse(input)

  const owner = await db.user.findOne({
    where: { name: userName },
  })

  if (!owner) {
    throw new NotFoundError()
  }

  const space = await db.space.findOne({
    where: {
      name_ownerId: {
        name: spaceName,
        ownerId: owner.id,
      },
    },
    include: {
      members: {
        select: PUBLIC_USER_FIELDS,
      },
      owner: {
        select: PUBLIC_USER_FIELDS,
      },
    },
  })
  if (!space) {
    throw new NotFoundError()
  }

  if (
    space.ownerId !== ctx.session!.userId &&
    !space.members.find((m) => m.id === ctx.session!.userId)
  ) {
    throw new NotFoundError()
  }

  return space
}
