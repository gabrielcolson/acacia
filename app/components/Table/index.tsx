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
    // apply the table props
    <Box rounded="md" p={3} w="full">
      <Box as="table" {...getTableProps()} w="full">
        <Box as="thead">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <Box as="th" {...column.getHeaderProps()} textAlign="left" pb={3}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </Box>
                  ))
                }
              </tr>
            ))
          }
        </Box>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <Box as="tr" {...row.getRowProps()} py={3}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, index) => {
                      // Apply the cell props
                      return (
                        <Box as="td" {...cell.getCellProps()} py={3} borderTopWidth="1px">
                          <Flex align="center" justify="start">
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </Flex>
                        </Box>
                      )
                    })
                  }
                </Box>
              )
            })
          }
        </tbody>
      </Box>
    </Box>
  )
}

export default Table
