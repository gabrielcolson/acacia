import { Box, Skeleton, Stack } from "@chakra-ui/core"
import PrivateLayout from "app/layouts/PrivateLayout"
import ProfileSection from "app/services/dashboard/components/ProfileSection"
import SpaceCard from "app/services/spaces/components/SpaceCard"
import SpaceList from "app/services/spaces/components/SpaceList"
import { SpaceWithUsers } from "db"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

const SpaceListSkeleton = (): JSX.Element => {
  const spaces = Array.from(new Array(2).keys()).map(
    (id) =>
      (({
        id,
        name: "test",
        owner: {},
        members: [],
      } as unknown) as SpaceWithUsers)
  )
  return (
    <Stack spacing={5} align="center">
      {spaces.map((space: SpaceWithUsers) => (
        <Box w="full" maxW="md" flex={1} key={space.id}>
          <Skeleton>
            <SpaceCard space={space} />
          </Skeleton>
        </Box>
      ))}
    </Stack>
  )
}

const DashboardPage = (): JSX.Element => (
  <>
    <ProfileSection />
    <Box my="48px" px={5}>
      <Suspense fallback={<SpaceListSkeleton />}>
        <SpaceList />
      </Suspense>
    </Box>
  </>
)

DashboardPage.getLayout = (page: BlitzPage): JSX.Element => (
  <PrivateLayout title="dashboard">{page}</PrivateLayout>
)

export default DashboardPage
