import { Box, Flex } from "@chakra-ui/core"
import { useTable, Column } from "react-table"

export interface TableProps<T extends object = {}> {
  columns: Column<T>[]
  data: T[]
}

const Table = <T extends object = {}>({ data, columns }: TableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <Box rounded="md" p={3} w="full">
      <Box as="table" {...getTableProps()} w="full">
        <Box as="thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Box as="th" {...column.getHeaderProps()} textAlign="left" pb={3}>
                  {column.render("Header")}
                </Box>
              ))}
            </tr>
          ))}
        </Box>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Box as="tr" {...row.getRowProps()} py={3}>
                {row.cells.map((cell, index) => {
                  return (
                    <Box as="td" {...cell.getCellProps()} py={3} borderTopWidth="1px">
                      <Flex align="center" justify="start">
                        {cell.render("Cell")}
                      </Flex>
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </tbody>
      </Box>
    </Box>
  )
}

export default Table
