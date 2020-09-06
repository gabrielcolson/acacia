import { Link as BlitzLink, useRouter } from "@blitzjs/core"
import { Link } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import { ReactNode } from "react"

export interface NavTabsProps {
  children: ReactNode
  tabs: { name: string; href: string; as?: string }[]
}

const NavTabs = ({ tabs, children }: NavTabsProps): JSX.Element => {
  const router = useRouter()
  return (
    <>
      <SectionContainer spacing={3} isInline bg="teal.500" borderBottomWidth="1px">
        {tabs.map((tab) => (
          <Tab
            name={tab.name}
            href={tab.href}
            as={tab.as}
            active={(tab.as || tab.href) === router.asPath}
            key={tab.name}
          />
        ))}
      </SectionContainer>
      {children}
    </>
  )
}

interface TabProps {
  active: boolean
  href: string
  name: string
  as?: string
}

const Tab = ({ href, name, active, as }: TabProps): JSX.Element => {
  return (
    <BlitzLink href={href} as={as}>
      <Link
        py={2}
        px={3}
        textAlign="center"
        color={active ? "white" : "whiteAlpha.700"}
        _hover={{ color: "white" }}
        borderBottomWidth="3px"
        borderBottomColor={active ? "white" : "transparent"}
        _active={{ textDecoration: "none" }}
      >
        {name}
      </Link>
    </BlitzLink>
  )
}

export default NavTabs
