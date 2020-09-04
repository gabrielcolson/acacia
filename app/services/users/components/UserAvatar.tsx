import { Avatar } from "@chakra-ui/core"
import { AvatarProps } from "@chakra-ui/core"

export type UserAvatarProps = {
  user: { name: string; pictureURL: string | null }
} & AvatarProps

const UserAvatar = ({ user: { name, pictureURL }, ...props }: UserAvatarProps): JSX.Element => (
  <Avatar name={name} src={pictureURL || undefined} {...props} />
)

export default UserAvatar
