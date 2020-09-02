import { Router } from "blitz"
import { Button } from "@chakra-ui/core"
import logout from "app/services/auth/mutations/logout"

const DashboardPage = (): JSX.Element => {
  return (
    <>
      <Button onClick={() => logout().then(() => Router.push("/"))}>Log out</Button>
    </>
  )
}

export default DashboardPage
