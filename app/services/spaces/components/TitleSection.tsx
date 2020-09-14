import { Box, Button, Heading, Stack, useDisclosure } from "@chakra-ui/core"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import CreateExpenseModal from "app/services/expenses/components/CrateExpenseModal"
import { SpaceWithUsers } from "db"
import UserAvatar from "app/services/users/components/UserAvatar"

export interface TitleSectionProps {
  space: SpaceWithUsers
}

const TitleSection = ({ space }: TitleSectionProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  return (
    <TitleSectionContainer flexDirection={{ base: "column", md: "row" }}>
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

      <Button onClick={onOpen} variantColor="teal" size="md" mt={{ base: 6, md: 0 }}>
        New Expense
      </Button>
      <CreateExpenseModal spaceId={space.id} isOpen={isOpen} onClose={onClose} />
    </TitleSectionContainer>
  )
}

export default TitleSection
