import { BlitzPage } from "@blitzjs/core"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const ExpensesPage = (): JSX.Element => {
  return <>Expenses</>
}

ExpensesPage.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default ExpensesPage
