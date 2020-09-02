import { Link } from "blitz"
import { Box, Flex, Heading, Stack } from "@chakra-ui/core"

import ButtonLink from "app/components/ButtonLink"

const Header = (): JSX.Element => {
  return (
    <Flex p={3} w="full" align="center" color="white" bg="teal.500">
      <Box flex={1}>
        <Link href="/">
          <Heading as="a" cursor="pointer" size="md">
            Acacia
          </Heading>
        </Link>
      </Box>

      <Stack isInline spacing={3}>
        <ButtonLink href="/login" variant="ghost" cursor="pointer">
          Log in
        </ButtonLink>

        <ButtonLink href="/register" variant="outline" cursor="pointer">
          Register
        </ButtonLink>
      </Stack>
    </Flex>
  )
}

export default Header
