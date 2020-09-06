import { BlitzPage } from "@blitzjs/core"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"

const MembersPage: BlitzPage = () => <>Members</>

MembersPage.getLayout = (page) => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default MembersPage
