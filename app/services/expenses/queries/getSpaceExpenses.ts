import { SessionContext } from "@blitzjs/core"
import { GetSpaceExpensesInput, GetSpaceExpensesInputType } from "app/services/expenses/validations"
import getSpace from "app/services/spaces/queries/getSpace"
import db, { PUBLIC_USER_FIELDS } from "db"

export default async function getSpaceExpenses(
  input: GetSpaceExpensesInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { whereSpace } = GetSpaceExpensesInput.parse(input)

  const space = await getSpace(whereSpace, ctx)

  return await db.expense.findMany({
    where: {
      spaceId: space.id,
    },
    orderBy: {
      occurredAt: "desc",
    },
    include: {
      payer: { select: PUBLIC_USER_FIELDS },
    },
  })
}
