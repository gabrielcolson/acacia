import Table from "app/components/Table"
import { useCurrentSpace } from "app/hooks/userCurrentSpace"
import UserAvatar from "app/services/users/components/UserAvatar"
import { PublicUser } from "db"
import { useMemo } from "react"
import { CellProps, Column } from "react-table"

const MembersTable = (): JSX.Element => {
  const space = useCurrentSpace()
  const columns = useMemo<Array<Column<PublicUser>>>(
    () => [
      {
        Header: "",
        Cell: ({ row }: CellProps<PublicUser>) => <UserAvatar user={row.original} size="md" />,
        id: "profilePicture",
      },
      {
        Header: "Name",
        accessor: (user) => user.displayName || user.name,
        id: "name",
      },
      {
        Header: "Role",
        accessor: (user) => (space.ownerId === user.id ? "owner" : "member"),
        id: "role",
      },
    ],
    [space.ownerId]
  )

  return <Table columns={columns} data={space.members} />
}

export default MembersTable
