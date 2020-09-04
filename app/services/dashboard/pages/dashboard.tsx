import { Avatar, Box, Button, Flex, Heading, Skeleton, Stack, useDisclosure } from "@chakra-ui/core"
import { useCurrentUser } from "app/hooks/userCurrentUser"
import PrivateLayout from "app/layouts/PrivateLayout"
import CreateSpaceModal from "app/services/spaces/components/CreateSpaceModal"
import SpaceCard from "app/services/spaces/components/SpaceCard"
import SpaceList from "app/services/spaces/components/SpaceList"
import { SpaceWithUsers } from "app/services/spaces/types"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

const UserInfo = (): JSX.Element => {
  const user = useCurrentUser()
  console.log(user.email)
  return (
    <Flex alignItems="center">
      <Avatar src={user.pictureURL || ""} size="lg" name={user.name} />
      <Stack ml={3}>
        <Heading>{user.name}</Heading>
        <span>{user.email}</span>
      </Stack>
    </Flex>
  )
}

const UserInfoSkeleton = (): JSX.Element => (
  <Flex alignItems="center">
    <Skeleton borderRadius="50%">
      <Avatar size="lg" />
    </Skeleton>
    <Stack ml={3}>
      <Skeleton>
        <Heading>RANDOM NAME</Heading>
        randomemail@random.com
      </Skeleton>
    </Stack>
  </Flex>
)

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

const DashboardPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex width="full" bg="teal.50" justify="center">
        <Stack
          maxW="5xl"
          w="full"
          px={5}
          py="48px"
          borderBottomWidth="1px"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={1}>
            <Suspense fallback={<UserInfoSkeleton />}>
              <UserInfo />
            </Suspense>
          </Box>
          <Button variantColor="teal" size="lg" onClick={onOpen} mt={{ base: 6, md: 0 }}>
            New Space
          </Button>
        </Stack>
      </Flex>
      <Box my="48px" px={5}>
        <Suspense fallback={<SpaceListSkeleton />}>
          <SpaceList />
        </Suspense>
      </Box>
      <CreateSpaceModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

DashboardPage.getLayout = (page: BlitzPage): JSX.Element => (
  <PrivateLayout title="dashboard">{page}</PrivateLayout>
)

export default DashboardPage
