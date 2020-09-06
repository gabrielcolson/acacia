import { useQuery } from "@blitzjs/core"
import { Box, Stack } from "@chakra-ui/core"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import getSpaceExpenses from "app/services/expenses/queries/getSpaceExpenses"
import { ExpenseWithPayer } from "db"

const ExpenseList = (): JSX.Element => {
  const whereSpace = useSpaceInfoFromURL()
  const [expenses] = useQuery(getSpaceExpenses, { whereSpace })
  return (
    <Stack>
      {expenses.map((expense: ExpenseWithPayer) => (
        <Box key={expense.id}>
          {expense.label}:{expense.amount}€
        </Box>
      ))}
    </Stack>
  )
}

export default ExpenseList
