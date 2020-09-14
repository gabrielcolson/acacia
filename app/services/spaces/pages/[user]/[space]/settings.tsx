import { BlitzPage } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const SpaceSettings = (): JSX.Element => {
  return (
    <TitleSectionContainer>
      <Heading>Space Settings</Heading>
    </TitleSectionContainer>
  )
}

SpaceSettings.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default SpaceSettings
