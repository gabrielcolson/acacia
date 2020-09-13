import { BlitzPage } from "@blitzjs/core"
import { useCurrentSpace } from "app/hooks/userCurrentSpace"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import { Suspense } from "react"
import TitleSection from "app/services/spaces/components/TitleSection"

const SpacePage = (): JSX.Element => {
  const space = useCurrentSpace()

  return (
    <>
      <TitleSection space={space} />
    </>
  )
}

const SpacePageWrapper = (): JSX.Element => {
  return (
    <Suspense fallback="loading...">
      <SpacePage />
    </Suspense>
  )
}

SpacePageWrapper.getLayout = (page: BlitzPage) => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default SpacePageWrapper
