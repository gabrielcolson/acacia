import { BlitzPage } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import ExpenseTable from "app/services/expenses/components/ExpenseTable"
import { Suspense } from "react"

const ExpensesPage = (): JSX.Element => {
  return (
    <>
      <TitleSectionContainer>
        <Heading>Expenses</Heading>
      </TitleSectionContainer>
      <SectionContainer mt={5}>
        <Suspense fallback="loading">
          <ExpenseTable />
        </Suspense>
      </SectionContainer>
    </>
  )
}

ExpensesPage.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default ExpensesPage
