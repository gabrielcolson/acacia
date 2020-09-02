import { Flex } from "@chakra-ui/core"
import getCurrentUser from "app/services/users/queries/getCurrentUser"
import { ReactNode } from "react"
import { Head, useQuery, useRouter } from "blitz"

import Header from "./Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const [user, { isLoading }] = useQuery(getCurrentUser, null, { suspense: false })
  const router = useRouter()

  if (!isLoading && user) {
    router.push("/dashboard")
  }

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

export default Layout
