import { BlitzPage } from "@blitzjs/core"
import PrivateLayout from "app/layouts/PrivateLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const SpaceSettings = (): JSX.Element => {
  return <>Space Settings</>
}

SpaceSettings.getLayout = (page: BlitzPage): JSX.Element => (
  <PrivateLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </PrivateLayout>
)

export default SpaceSettings
