import { BlitzPage } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import DashboardLayout from "app/layouts/DashboardLayout"
import MainLayout from "app/layouts/MainLayout"

const SettingsPage = (): JSX.Element => {
  return (
    <TitleSectionContainer>
      <Heading>User Settings</Heading>
    </TitleSectionContainer>
  )
}

SettingsPage.getLayout = (page: BlitzPage) => (
  <MainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </MainLayout>
)

export default SettingsPage
