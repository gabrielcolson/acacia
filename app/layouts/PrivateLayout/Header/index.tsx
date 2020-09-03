import { useCurrentUser } from "app/hooks/userCurrentUser"
import logout from "app/services/auth/mutations/logout"
import { Link, useRouter } from "blitz"
import {
  Avatar,
  Box,
  Flex,
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
} from "@chakra-ui/core"
import { Suspense } from "react"

const AvatarMenuButton = (): JSX.Element => {
  const user = useCurrentUser()

  return <Avatar as={MenuButton} size="sm" src={user.pictureURL || ""} name={user.name} />
}

export type LinkMenuItemProps = {
  href: string
} & MenuItemProps

const LinkMenuItem = ({ href, ...props }: LinkMenuItemProps): JSX.Element => {
  return (
    <Link href={href}>
      <MenuItem {...props} />
    </Link>
  )
}

const Header = (): JSX.Element => {
  const router = useRouter()

  async function handleLogout(): Promise<void> {
    await logout()
    await router.push("/")
  }

  return (
    <Flex color="white" bg="teal.500" justify="center">
      <Flex w="5xl" p={5} align="center">
        <Box flex={1}>
          <Link href="/dashboard">
            <Heading as="a" cursor="pointer" size="md">
              Acacia
            </Heading>
          </Link>
        </Box>

        <Stack isInline spacing={3} align="center" color="black">
          <Menu>
            <Suspense
              fallback={
                <Skeleton borderRadius="50%">
                  <Avatar size="sm" />
                </Skeleton>
              }
            >
              <AvatarMenuButton />
            </Suspense>
            <MenuList placement="bottom-end">
              <LinkMenuItem href="/dashboard">Dashboard</LinkMenuItem>
              <MenuDivider />
              <MenuItem isDisabled {...{ rightIcon: "add" }}>
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
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default Header
