import { Button, ButtonProps, Icon } from "@chakra-ui/core"
import { GithubIcon } from "app/components/icons"
import React, { useState } from "react"

export type GithubButtonProps = Omit<
  ButtonProps,
  "children" | "bg" | "color" | "as" | "_hover" | "isLoading" | "onClick"
>

const GithubButton = (props: GithubButtonProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      isLoading={isLoading}
      onClick={() => setIsLoading(true)}
      bg="black"
      color="white"
      as="a"
      {...{ href: "/api/auth/github" }}
      _hover={{ bg: "blackAlpha.800" }}
      {...{ props }}
    >
      <Icon color="white" as={GithubIcon} size="24px" mr={2} />
      Continue with GitHub
    </Button>
  )
}

export default GithubButton
