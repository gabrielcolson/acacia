import { Box, Button, Heading, Stack } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import { SpaceWithUsers } from "db"
import UserAvatar from "app/services/users/components/UserAvatar"

export interface TitleSectionProps {
  space: SpaceWithUsers
}

const TitleSection = ({ space }: TitleSectionProps) => (
  <SectionContainer bg="teal.50" py="48px" flexDirection={{ base: "column", md: "row" }}>
    <Stack flex={1}>
      <Heading>{space.name}</Heading>

      <Stack align="center" isInline spacing={2} shouldWrapChildren>
        <span>By</span>
        <UserAvatar user={space.owner} size="sm" />
        <Box as="span" fontWeight="bold">
          {space.owner.displayName}
        </Box>
      </Stack>
    </Stack>
    <Button variantColor="teal" size="md" mt={{ base: 6, md: 0 }}>
      New Expense
    </Button>
  </SectionContainer>
)

export default TitleSection
