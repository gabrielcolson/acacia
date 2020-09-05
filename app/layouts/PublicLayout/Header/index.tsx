import { Link } from "blitz"
import { Box, ButtonGroup, Flex, Heading } from "@chakra-ui/core"

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

      <ButtonGroup spacing={3}>
        <ButtonLink
          href="/login"
          variant="outline"
          variantColor="whiteAlpha.500"
          cursor="pointer"
          borderColor="whiteAlpha.500"
          _hover={{ borderColor: "white" }}
        >
          Log in
        </ButtonLink>

        <ButtonLink
          href="/register"
          cursor="pointer"
          variantColor="white"
          bg="white"
          color="teal.500"
          borderWidth="1px"
          borderColor="white"
          _hover={{ bg: "teal.500", color: "white" }}
        >
          Register
        </ButtonLink>
      </ButtonGroup>
    </Flex>
  )
}

export default Header
