import { Avatar, Box, Button, Flex, Heading, Skeleton, Stack, useDisclosure } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import { useCurrentUser } from "app/hooks/userCurrentUser"
import CreateSpaceModal from "app/services/spaces/components/CreateSpaceModal"
import { Suspense } from "react"

const UserInfo = (): JSX.Element => {
  const user = useCurrentUser()
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

const ProfileSection = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <SectionContainer py="48px" flexDirection={{ base: "column", md: "row" }} bg="teal.50">
      <Box flex={1}>
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo />
        </Suspense>
      </Box>
      <Button variantColor="teal" size="md" onClick={onOpen} mt={{ base: 6, md: 0 }}>
        New Space
      </Button>
      <CreateSpaceModal isOpen={isOpen} onClose={onClose} />
    </SectionContainer>
  )
}
export default ProfileSection
