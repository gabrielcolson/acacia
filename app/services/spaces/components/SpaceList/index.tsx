import { Box, Stack } from "@chakra-ui/core"
import SpaceCard from "app/services/spaces/components/SpaceCard"
import getMySpaces from "app/services/spaces/queries/getMySpaces"
import { useQuery } from "blitz"

const SpaceList = (): JSX.Element => {
  const [spaces] = useQuery(getMySpaces, null)
  return (
    <Stack spacing={5} align="center" px={3}>
      {spaces.map((space) => (
        <Box w="full" maxW="md" flex={1} key={space.id}>
          <SpaceCard space={space} />
        </Box>
      ))}
    </Stack>
  )
}

export default SpaceList
