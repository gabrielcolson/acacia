import { Flex, Stack, StackProps } from "@chakra-ui/core"
import React from "react"

export type DashboardContainerProps = Omit<StackProps, "p" | "w">

const SectionContainer = ({
  children,
  bg,
  borderBottomWidth,
  ...props
}: DashboardContainerProps): JSX.Element => (
  <Flex w="full" justify="center" bg={bg} borderBottomWidth={borderBottomWidth}>
    <Stack isInline px={5} w="5xl" {...props}>
      {children}
    </Stack>
  </Flex>
)

export default SectionContainer
