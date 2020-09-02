import db from "db"
import { SessionContext } from "blitz"
import { hashPassword } from "app/services/auth/auth-utils"
import { RegisterInput, RegisterInputType } from "app/services/auth/validations"

export default async function register(
  input: RegisterInputType,
  ctx: { session?: SessionContext } = {}
) {
  // This throws an error if input is invalid
  const { email, password, name } = RegisterInput.parse(input)

  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: { email, name, hashedPassword, role: "user" },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
