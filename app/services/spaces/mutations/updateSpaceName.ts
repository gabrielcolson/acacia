import { SessionContext } from "@blitzjs/core"
import { getSpaceAsOwner } from "app/services/spaces/utils"
import { UpdateSpaceNameInput, UpdateSpaceNameInputType } from "app/services/spaces/validations"
import db, { PUBLIC_USER_FIELDS } from "db"

export default async function updateSpaceName(
  input: UpdateSpaceNameInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { spaceId, name } = UpdateSpaceNameInput.parse(input)

  const space = await getSpaceAsOwner({ id: spaceId }, ctx)

  return await db.space.update({
    where: { id: space.id },
    data: { name },
    include: {
      owner: { select: PUBLIC_USER_FIELDS },
      members: { select: PUBLIC_USER_FIELDS },
    },
  })
}
