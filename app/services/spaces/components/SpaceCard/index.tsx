import { Avatar, AvatarGroup, Box, Heading } from "@chakra-ui/core"
import { Space } from "db"

export interface SpaceCardProps {
  space: Space & { owner: { id: string; name: string; pictureURL?: string } } & {
    members: { id: string; name: string; pictureURL?: string }[]
  }
}

const SpaceCard = ({ space }: SpaceCardProps): JSX.Element => {
  return (
    <Box width="full" rounded="lg" borderWidth="1px" p="24px">
      <Heading mt={1} size="lg">
        {space.name}
      </Heading>
      <AvatarGroup mt={3} size="sm">
        <Avatar src={space.owner.pictureURL} size="xs" name={space.owner.name} showBorder />
        {space.members.map((member) => (
          <Avatar src={member.pictureURL} size="xs" name={member.name} key={member.id} showBorder />
        ))}
      </AvatarGroup>
    </Box>
  )
}

export default SpaceCard
