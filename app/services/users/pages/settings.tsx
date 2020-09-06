import { BlitzPage } from "@blitzjs/core"
import DashboardLayout from "app/layouts/DashboardLayout"
import MainLayout from "app/layouts/MainLayout"

const SettingsPage = (): JSX.Element => {
  return <div>Settings</div>
}

SettingsPage.getLayout = (page: BlitzPage) => (
  <MainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </MainLayout>
)

export default SettingsPage
