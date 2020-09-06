import ButtonLink from "app/components/ButtonLink"
import SectionContainer from "app/components/SectionContainer"
import logout from "app/services/auth/mutations/logout"
import CreateSpaceModal from "app/services/spaces/components/CreateSpaceModal"
import getCurrentUser from "app/services/users/queries/getCurrentUser"
import { Link, useQuery, useRouter, useSession } from "blitz"
import {
  Avatar,
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemProps,
  MenuList,
  useDisclosure,
} from "@chakra-ui/core"
import { Suspense } from "react"
import React from "react"

const AvatarMenuButton = (): JSX.Element => {
  const session = useSession()
  const [user] = useQuery(getCurrentUser, null, {
    enabled: !!session.userId && !session.isLoading,
  })

  if (session.isLoading) {
    return <></>
  }

  if (!user) {
    return (
      <ButtonGroup spacing={3}>
        <ButtonLink
          color="white"
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
    )
  }

  return <Avatar as={MenuButton} size="sm" src={user.pictureURL || ""} name={user.name} />
}

export type LinkMenuItemProps = {
  href: string
} & MenuItemProps

const LinkMenuItem = React.forwardRef(
  ({ href, ...props }: LinkMenuItemProps, ref): JSX.Element => (
    <Link href={href}>
      <MenuItem {...props} ref={ref} />
    </Link>
  )
)

const Header = (): JSX.Element => {
  const router = useRouter()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  async function handleLogout(): Promise<void> {
    await logout()
    await router.push("/")
  }

  return (
    <SectionContainer color="white" bg="teal.500" align="center" py={3}>
      <Flex flex={1} height="40px" align="center">
        <Link href="/">
          <Heading as="a" cursor="pointer" size="md">
            Acacia
          </Heading>
        </Link>
      </Flex>

      <Suspense fallback={null}>
        <Menu>
          {({ onClose }) => (
            <Box color="black">
              <AvatarMenuButton />
              <MenuList placement="bottom-end" onClick={onClose}>
                <LinkMenuItem href="/dashboard">Dashboard</LinkMenuItem>

                <MenuDivider />

                <MenuItem {...{ rightIcon: "add" }} onClick={onModalOpen}>
                  <Box as="span" flex={1}>
                    New Space
                  </Box>
                  <Icon name="add" />
                </MenuItem>

                <LinkMenuItem href="/settings">Settings</LinkMenuItem>

                <MenuDivider />

                <MenuItem isDisabled>Theme</MenuItem>

                <MenuDivider />

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Box>
          )}
        </Menu>
        <CreateSpaceModal isOpen={isModalOpen} onClose={onModalClose} />
      </Suspense>
    </SectionContainer>
  )
}

export default Header
