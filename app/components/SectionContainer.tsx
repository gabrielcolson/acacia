import { Flex, FlexProps } from "@chakra-ui/core"
import React from "react"

export type DashboardContainerProps = Omit<FlexProps, "p" | "w">

const SectionContainer = ({ children, bg, ...props }: DashboardContainerProps): JSX.Element => (
  <Flex w="full" justify="center" bg={bg} borderBottomWidth="1px">
    <Flex p={5} w="5xl" {...props}>
      {children}
    </Flex>
  </Flex>
)

export default SectionContainer
