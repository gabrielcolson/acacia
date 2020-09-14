import { BlitzPage } from "@blitzjs/core"
import { Heading, Stack, useToast } from "@chakra-ui/core"
import SectionContainer from "app/components/SectionContainer"
import SettingForm from "app/components/SettingForm"
import TextInput from "app/components/TextInput"
import TitleSectionContainer from "app/components/TitleSectionContainer"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import DashboardLayout from "app/layouts/DashboardLayout"
import MainLayout from "app/layouts/MainLayout"
import updateDisplayName from "app/services/users/mutations/updateDisplayName"
import updateUsername from "app/services/users/mutations/updateUsername"
import { UpdateDisplayNameInputType, UpdateUsernameInputType } from "app/services/users/validations"
import { Suspense } from "react"

const SettingsList = () => {
  const user = useCurrentUser()
  const toast = useToast()

  return (
    <Stack spacing={5} w="full" shouldWrapChildren>
      <SettingForm<UpdateUsernameInputType>
        footerText="Please use 50 characters at maximum."
        initialValues={{ name: user.name }}
        onSubmit={async (values) => {
          try {
            await updateUsername(values)
            toast({
              status: "success",
              title: "Update successful",
              description: "Your username has been updated",
              isClosable: true,
            })
          } catch (error) {}
        }}
        title="Username"
        description="This is your internal name within Acacia. It must be unique."
      >
        <TextInput w="300px" name="name" />
      </SettingForm>

      <SettingForm<UpdateDisplayNameInputType>
        footerText="Please use 50 characters at maximum."
        initialValues={{ displayName: user.displayName }}
        onSubmit={async (values) => {
          try {
            await updateDisplayName(values)
            toast({
              status: "success",
              title: "Update successful",
              description: "Your name has been updated",
              isClosable: true,
            })
          } catch (error) {}
        }}
        title="Your name"
        description="Please enter your full name. Everyone can see it."
      >
        <TextInput w="300px" name="displayName" />
      </SettingForm>
    </Stack>
  )
}

const SettingsPage = (): JSX.Element => {
  return (
    <>
      <TitleSectionContainer>
        <Heading>User Settings</Heading>
      </TitleSectionContainer>
      <SectionContainer mt={5}>
        <Suspense fallback="loading">
          <SettingsList />
        </Suspense>
      </SectionContainer>
    </>
  )
}

SettingsPage.getLayout = (page: BlitzPage) => (
  <MainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </MainLayout>
)

export default SettingsPage
