import { BlitzPage } from "@blitzjs/core"
import PrivateLayout from "app/layouts/PrivateLayout"

const SettingsPage = (): JSX.Element => {
  return <div>Settings</div>
}

SettingsPage.getLayout = (page: BlitzPage) => <PrivateLayout>{page}</PrivateLayout>

export default SettingsPage
