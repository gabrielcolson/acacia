import { useQuery } from "@blitzjs/core"
import { Stack, Text } from "@chakra-ui/core"
import Table from "app/components/Table"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import getSpaceExpenses from "app/services/expenses/queries/getSpaceExpenses"
import UserAvatar from "app/services/users/components/UserAvatar"
import { ExpenseWithPayer } from "db"
import { useMemo } from "react"
import { CellProps, Column } from "react-table"

const ExpenseTable = (): JSX.Element => {
  const whereSpace = useSpaceInfoFromURL()
  const [expenses] = useQuery(getSpaceExpenses, { whereSpace })
  const columns = useMemo<Array<Column<ExpenseWithPayer>>>(
    () => [
      {
        Header: "Payer",
        accessor: (expense) => expense.payer.displayName,
        id: "payer.displayName",
        Cell: ({ row, value }: CellProps<ExpenseWithPayer>) => (
          <Stack isInline align="center">
            <UserAvatar user={row.original.payer} size="sm" />
            <Text display={{ base: "none", sm: "block" }}>{value}</Text>
          </Stack>
        ),
      },
      {
        Header: "Amount (€)",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: (expense: ExpenseWithPayer) => expense.occurredAt.toLocaleDateString(),
      },
    ],
    []
  )

  return <Table columns={columns} data={expenses} />
}

export default ExpenseTable
