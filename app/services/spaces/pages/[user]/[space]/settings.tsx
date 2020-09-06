import { BlitzPage } from "@blitzjs/core"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const SpaceSettings = (): JSX.Element => {
  return <>Space Settings</>
}

SpaceSettings.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default SpaceSettings
