import { Avatar, AvatarGroup, Box, Heading, Link } from "@chakra-ui/core"
import { SpaceWithUsers } from "app/services/spaces/types"
import { Link as BlitzLink } from "blitz"

export interface SpaceCardProps {
  space: SpaceWithUsers
}

const SpaceCard = ({ space }: SpaceCardProps): JSX.Element => {
  return (
    <Box width="full" rounded="md" borderWidth="1px" p="24px">
      <BlitzLink href="/[user]/[space]" as={`/${space.owner.name}/${space.name}`}>
        <Heading mt={1} size="lg" as={Link}>
          {space.name}
        </Heading>
      </BlitzLink>
      <AvatarGroup mt={3} size="sm">
        <Avatar src={space.owner.pictureURL || ""} size="xs" name={space.owner.name} showBorder />
        {space.members.map((member) => (
          <Avatar
            src={member.pictureURL || ""}
            size="xs"
            name={member.name}
            key={member.id}
            showBorder
          />
        ))}
      </AvatarGroup>
    </Box>
  )
}

export default SpaceCard
