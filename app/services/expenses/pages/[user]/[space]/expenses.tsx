import { BlitzPage } from "@blitzjs/core"
import SectionContainer from "app/components/SectionContainer"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import ExpenseList from "app/services/expenses/components/ExpenseList"
import { Suspense } from "react"

const ExpensesPage = (): JSX.Element => {
  return (
    <SectionContainer>
      <Suspense fallback="loading">
        <ExpenseList />
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
