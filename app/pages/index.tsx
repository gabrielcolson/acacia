import { BlitzPage } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import { Suspense } from "react"
import PublicLayout from "app/layouts/PublicLayout"

const Home = (): JSX.Element => {
  return (
    <>
      <Suspense fallback="Loading...">
        <Heading>Acacia</Heading>
        <div>
          <img
            alt="money"
            src="https://i.pinimg.com/originals/d9/c7/5b/d9c75bdc08ceb24ca15a462c3eaa4a7f.gif"
          ></img>
        </div>
      </Suspense>
    </>
  )
}

Home.getLayout = (page: BlitzPage) => <PublicLayout title="Home">{page}</PublicLayout>

export default Home
