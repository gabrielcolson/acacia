import { BlitzPage, useQuery } from "@blitzjs/core"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import getSpace from "app/services/spaces/queries/getSpace"
import { Suspense } from "react"
import TitleSection from "app/services/spaces/components/spacePage/TitleSection"

const SpacePage = (): JSX.Element => {
  const { user: ownerName, space: spaceName } = useSpaceInfoFromURL()
  const [space] = useQuery(getSpace, { user: ownerName, space: spaceName })

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
