import { BlitzPage } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import AddMemberForm from "app/services/spaces/components/AddMemberForm"
import MembersTable from "app/services/spaces/components/MembersTable"
import { Suspense } from "react"

const MembersPage: BlitzPage = () => (
  <>
    <SectionContainer mt={5}>
      <Heading>Members</Heading>
    </SectionContainer>
    <SectionContainer mt={5}>
      <AddMemberForm w="full" />
    </SectionContainer>
    <SectionContainer mt={5}>
      <Suspense fallback="loading...">
        <MembersTable />
      </Suspense>
    </SectionContainer>
  </>
)

MembersPage.getLayout = (page) => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default MembersPage
