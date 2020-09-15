import { SessionContext } from "@blitzjs/core"
import { getSpaceAsOwner } from "app/services/spaces/utils"
import { DeleteSpaceInput, DeleteSpaceInputType } from "app/services/spaces/validations"
import db from "db"

export default async function deleteSpace(
  input: DeleteSpaceInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { spaceId } = DeleteSpaceInput.parse(input)
  const space = await getSpaceAsOwner({ id: spaceId }, ctx)

  await db.expense.deleteMany({
    where: { spaceId: space.id },
  })
  await db.space.delete({
    where: { id: space.id },
  })
}
