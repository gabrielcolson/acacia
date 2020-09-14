import { Flex } from "@chakra-ui/core"
import { Head } from "blitz"
import { ReactNode } from "react"

import Header from "./Header"

export interface MainLayoutProps {
  title?: string
  children: ReactNode
}

const MainLayout = ({ title, children }: MainLayoutProps): JSX.Element => {
  return (
    <Flex flexDirection="column" minH="100vh">
      <Head>
        <title>{title || "acacia"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex flexDirection="column" as="main" flex={1} pb={5}>
        {children}
      </Flex>
    </Flex>
  )
}

export default MainLayout
