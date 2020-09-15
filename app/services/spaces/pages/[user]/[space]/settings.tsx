import { BlitzPage, useRouter } from "@blitzjs/core"
import { Heading, Stack, useToast } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import SettingForm from "app/components/SettingForm"
import TextInput from "app/components/TextInput"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import { useCurrentSpace } from "app/hooks/userCurrentSpace"
import MainLayout from "app/layouts/MainLayout"
import SpaceLayout from "app/layouts/SpaceLayout"
import deleteSpace from "app/services/spaces/mutations/deleteSpace"
import updateSpaceName from "app/services/spaces/mutations/updateSpaceName"
import { DeleteSpaceInputType, UpdateSpaceNameInputType } from "app/services/spaces/validations"
import { Suspense } from "react"

const Settings = (): JSX.Element => {
  const space = useCurrentSpace()
  const toast = useToast()
  const router = useRouter()

  return (
    <Stack spacing={5} shouldWrapChildren w="full">
      <SettingForm<UpdateSpaceNameInputType>
        footerText="Please use 50 characters at maximum."
        initialValues={{ spaceId: space.id, name: space.name }}
        onSubmit={async (values) => {
          try {
            const newSpace = await updateSpaceName(values)
            toast({
              status: "success",
              title: "Update successful",
              description: "The space name has been updated.",
              isClosable: true,
            })
            await router.push(
              "/[user]/[space]/settings",
              `/${newSpace.owner.name}/${newSpace.name}/settings`
            )
          } catch (error) {}
        }}
        title="Space Name"
        description="This is the name of your space."
      >
        <TextInput w="300px" name="name" />
      </SettingForm>

      <SettingForm<DeleteSpaceInputType>
        footerText="The space cannot be retrieved after it is deleted."
        initialValues={{ spaceId: space.id }}
        onSubmit={async (values) => {
          try {
            await deleteSpace(values)
            toast({
              status: "success",
              title: "Space deleted",
              description: "The space has been deleted.",
              isClosable: true,
            })
            await router.push("/dashboard")
          } catch (error) {}
        }}
        title="Delete Space"
        description="This is the name of your space."
        variant="danger"
        buttonLabel="Delete"
      />
    </Stack>
  )
}

const SpaceSettings = (): JSX.Element => {
  return (
    <>
      <TitleSectionContainer>
        <Heading>Space Settings</Heading>
      </TitleSectionContainer>
      <SectionContainer mt={5}>
        <Suspense fallback="loading...">
          <Settings />
        </Suspense>
      </SectionContainer>
    </>
  )
}

SpaceSettings.getLayout = (page: BlitzPage): JSX.Element => (
  <MainLayout>
    <SpaceLayout>{page}</SpaceLayout>
  </MainLayout>
)

export default SpaceSettings
