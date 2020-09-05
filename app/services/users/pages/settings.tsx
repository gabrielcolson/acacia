import { BlitzPage } from "@blitzjs/core"
import DashboardLayout from "app/layouts/DashboardLayout"
import PrivateLayout from "app/layouts/PrivateLayout"

const SettingsPage = (): JSX.Element => {
  return <div>Settings</div>
}

SettingsPage.getLayout = (page: BlitzPage) => (
  <PrivateLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </PrivateLayout>
)

export default SettingsPage
