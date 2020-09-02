import { Link } from "blitz"
import { Button, ButtonProps } from "@chakra-ui/core"

export type ButtonLinkProps = {
  href: string
  as?: string
} & ButtonProps

const ButtonLink = ({ href, as, ...props }: ButtonLinkProps): JSX.Element => {
  return (
    <Link href={href} as={as}>
      <Button as="a" {...props} />
    </Link>
  )
}

export default ButtonLink
