import NavTabs from "app/components/NavTabs"
import { ReactNode } from "react"

export interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps): JSX.Element => {
  const tabs = [
    { name: "Overview", href: "/dashboard" },
    { name: "Settings", href: "/settings" },
  ]
  return <NavTabs tabs={tabs}>{children}</NavTabs>
}

export default DashboardLayout
