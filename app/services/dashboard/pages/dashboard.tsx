import { Avatar, Box, Button, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/core"
import { useCurrentUser } from "app/hooks/userCurrentUser"
import PrivateLayout from "app/layouts/PrivateLayout"
import CreateSpaceModal from "app/services/spaces/components/CreateSpaceModal"
import SpaceList from "app/services/spaces/components/SpaceList"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

const UserInfo = () => {
  const user = useCurrentUser()
  return (
    <Flex alignItems="center">
      <Avatar size="lg" name={user.name} />
      <Flex flexDirection="column" ml={3}>
        <Heading>{user.name}</Heading>
        {user.email}
      </Flex>
    </Flex>
  )
}

const DashboardPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Stack
        width="full"
        bg="teal.50"
        px={3}
        py="48px"
        borderBottomWidth="1px"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box flex={1}>
          <Suspense fallback="loading">
            <UserInfo />
          </Suspense>
        </Box>
        <Button variantColor="teal" size="lg" onClick={onOpen} mt={{ base: 6, md: 0 }}>
          New Space
        </Button>
      </Stack>
      <Box my="48px">
        <Suspense fallback="loading">
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
