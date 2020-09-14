import { SessionContext } from "@blitzjs/core"
import { UpdateDisplayNameInput, UpdateDisplayNameInputType } from "app/services/users/validations"
import db from "db"

export default async function updateDisplayName(
  input: UpdateDisplayNameInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { displayName } = UpdateDisplayNameInput.parse(input)

  await db.user.update({
    where: { id: ctx.session!.userId },
    data: { displayName },
  })
}
