import { Flex } from "@chakra-ui/core"
import { ReactNode } from "react"
import { Head } from "blitz"

import Header from "./Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => (
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

export default Layout
