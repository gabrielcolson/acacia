import { Flex } from "@chakra-ui/core"
import { Head } from "blitz"
import { ReactNode } from "react"

import Header from "./Header"

export interface PrivateLayoutProps {
  title?: string
  children: ReactNode
}

const PrivateLayout = ({ title, children }: PrivateLayoutProps): JSX.Element => {
  return (
    <Flex flexDirection="column" minH="100vh">
      <Head>
        <title>{title || "acacia"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex flexDirection="column" as="main" flex={1}>
        {children}
      </Flex>
    </Flex>
  )
}

export default PrivateLayout
