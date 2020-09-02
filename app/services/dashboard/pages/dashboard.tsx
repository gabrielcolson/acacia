import PrivateLayout from "app/layouts/PrivateLayout"
import { BlitzPage } from "blitz"

const DashboardPage = (): JSX.Element => {
  return <>Dashboard</>
}

DashboardPage.getLayout = (page: BlitzPage): JSX.Element => (
  <PrivateLayout title="dashboard">{page}</PrivateLayout>
)

export default DashboardPage
