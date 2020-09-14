import { SessionContext } from "@blitzjs/core"
import { UpdateUsernameInput, UpdateUsernameInputType } from "app/services/users/validations"
import db from "db"

export default async function updateUsername(
  input: UpdateUsernameInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { name } = UpdateUsernameInput.parse(input)

  await db.user.update({
    where: { id: ctx.session!.userId },
    data: {
      name,
    },
  })
}
