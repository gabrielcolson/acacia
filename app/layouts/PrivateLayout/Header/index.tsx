import SectionContainer from "app/components/SectionContainer"
import { useCurrentUser } from "app/hooks/userCurrentUser"
import logout from "app/services/auth/mutations/logout"
import CreateSpaceModal from "app/services/spaces/components/CreateSpaceModal"
import { Link, useRouter } from "blitz"
import {
  Avatar,
  Box,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemProps,
  MenuList,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/core"
import { Suspense } from "react"
import React from "react"

const AvatarMenuButton = (): JSX.Element => {
  const user = useCurrentUser()

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
    <SectionContainer color="white" bg="teal.500" align="center">
      <Box flex={1}>
        <Link href="/dashboard">
          <Heading as="a" cursor="pointer" size="md">
            Acacia
          </Heading>
        </Link>
      </Box>

      <Menu>
        {({ onClose }) => (
          <Box color="black">
            <Suspense
              fallback={
                <Skeleton borderRadius="50%">
                  <Avatar size="sm" />
                </Skeleton>
              }
            >
              <AvatarMenuButton />
            </Suspense>
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
    </SectionContainer>
  )
}

export default Header
