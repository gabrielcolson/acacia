import { BlitzPage, GetServerSideProps } from "@blitzjs/core"
import { Heading } from "@chakra-ui/core"
import MainLayout from "app/layouts/MainLayout"
import { getServerSidePropsPublicPage } from "app/services/auth/auth-utils"
import { Suspense } from "react"

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

Home.getLayout = (page: BlitzPage) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await getServerSidePropsPublicPage(ctx)
  return { props: {} }
}

export default Home
