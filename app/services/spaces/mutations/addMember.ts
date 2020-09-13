import getSpace from "app/services/spaces/queries/getSpace"
import { AddMemberInput, AddMemberInputType } from "app/services/spaces/validations"
import db from "db"
import { AuthorizationError, SessionContext } from "blitz"

export default async function addMember(
  input: AddMemberInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { whereSpace, email } = AddMemberInput.parse(input)

  const space = await getSpace(whereSpace, ctx)

  if (space.ownerId !== ctx.session!.userId) {
    throw new AuthorizationError()
  }

  return await db.space.update({
    where: { id: space.id },
    data: {
      members: { connect: { email } },
    },
  })
}
