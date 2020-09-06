import { CreateExpenseInput, CreateExpenseInputType } from "app/services/expenses/validations"
import getSpace from "app/services/spaces/queries/getSpace"
import { SessionContext } from "blitz"
import db from "db"

export default async function createExpense(
  input: CreateExpenseInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { label, amount, whereSpace } = CreateExpenseInput.parse(input)

  const space = await getSpace(whereSpace, ctx)

  return await db.expense.create({
    data: {
      label,
      amount,
      space: { connect: { id: space.id } },
      payer: { connect: { id: ctx.session!.userId } },
    },
  })
}
