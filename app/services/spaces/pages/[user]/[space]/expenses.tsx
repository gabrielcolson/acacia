import { BlitzPage } from "@blitzjs/core"
import PrivateLayout from "app/layouts/PrivateLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const ExpensesPage = (): JSX.Element => {
  return <>Expenses</>
}

ExpensesPage.getLayout = (page: BlitzPage): JSX.Element => (
  <PrivateLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </PrivateLayout>
)

export default ExpensesPage
