import { BlitzPage } from "@blitzjs/core"
import SectionContainer from "app/components/SectionContainer"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import ExpenseTable from "app/services/expenses/components/ExpenseTable"
import { Suspense } from "react"

const ExpensesPage = (): JSX.Element => {
  return (
    <SectionContainer mt={5}>
      <Suspense fallback="loading">
        <ExpenseTable />
      </Suspense>
    </SectionContainer>
  )
}

ExpensesPage.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default ExpensesPage
