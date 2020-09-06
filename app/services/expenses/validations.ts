import { GetSpaceInput } from "app/services/spaces/validations"
import * as z from "zod"

export const CreateExpenseInput = z.object({
  label: z.string().nonempty(),
  amount: z.number().min(0.01),
  whereSpace: GetSpaceInput,
})
export type CreateExpenseInputType = z.infer<typeof CreateExpenseInput>

export const GetSpaceExpensesInput = z.object({
  whereSpace: GetSpaceInput,
})
export type GetSpaceExpensesInputType = z.infer<typeof GetSpaceExpensesInput>
