import { useQuery } from "@blitzjs/core"
import { Box, Stack } from "@chakra-ui/core"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import getSpaceExpenses from "app/services/expenses/queries/getSpaceExpenses"

const ExpenseList = (): JSX.Element => {
  const whereSpace = useSpaceInfoFromURL()
  const [expenses] = useQuery(getSpaceExpenses, { whereSpace })
  return (
    <Stack>
      {expenses.map((expense) => (
        <Box key={expense.id}>
          {expense.label}:{expense.amount}€
        </Box>
      ))}
    </Stack>
  )
}

export default ExpenseList
