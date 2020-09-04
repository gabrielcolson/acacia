import { NotFoundError, SessionContext } from "blitz"
import { GetSpaceInput, GetSpaceInputType } from "app/services/spaces/validations"
import db from "db"

export default async function getSpace(
  input: GetSpaceInputType,
  ctx: { session?: SessionContext } = {}
) {
  console.log("here")
  ctx.session!.authorize()

  const { user: userName, space: spaceName } = GetSpaceInput.parse(input)

  const owner = await db.user.findOne({
    where: { name: userName },
  })

  if (!owner) {
    throw new NotFoundError()
  }
  console.log("owner:", owner)

  const space = await db.space.findOne({
    where: {
      name_ownerId: {
        name: spaceName,
        ownerId: owner.id,
      },
    },
    include: {
      members: {
        select: { name: true, displayName: true, id: true, pictureURL: true },
      },
      owner: {
        select: { id: true, name: true, displayName: true, pictureURL: true },
      },
    },
  })
  if (!space) {
    throw new NotFoundError()
  }
  console.log("space:", space)

  if (
    space.ownerId !== ctx.session!.userId &&
    !space.members.find((m) => m.id === ctx.session!.userId)
  ) {
    throw new NotFoundError()
  }

  return space
}
