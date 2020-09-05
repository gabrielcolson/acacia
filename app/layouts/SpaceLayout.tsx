import { useRouter } from "@blitzjs/core"
import NavTabs from "app/components/NavTabs"
import { ReactNode } from "react"

export interface SpaceLayoutProps {
  children: ReactNode
}

const SpaceLayout = ({ children }: SpaceLayoutProps): JSX.Element => {
  const router = useRouter()
  const { user, space } = (router.params as unknown) as {
    user: string
    space: string
  }
  const tabs = [
    { name: "Overview", href: "/[user]/[space]", as: `/${user}/${space}` },
    { name: "Expenses", href: "/[user]/[space]/expenses", as: `/${user}/${space}/expenses` },
    { name: "Settings", href: "/[user]/[space]/settings", as: `/${user}/${space}/settings` },
  ]

  return <NavTabs tabs={tabs}>{children}</NavTabs>
}

export default SpaceLayout
