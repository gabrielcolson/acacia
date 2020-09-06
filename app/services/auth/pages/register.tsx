import { GetServerSideProps } from "@blitzjs/core"
import GithubIcon from "app/components/icons"
import MainLayout from "app/layouts/MainLayout"
import { getServerSidePropsPublicPage } from "app/services/auth/auth-utils"
import { Link as BlitzLink } from "blitz"
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Link,
  Stack,
} from "@chakra-ui/core"
import TextInput from "app/components/TextInput"
import { Form, Formik } from "formik"
import React from "react"
import { useRouter, BlitzPage } from "blitz"
import register from "app/services/auth/mutations/register"
import { RegisterInput, RegisterInputType } from "app/services/auth/validations"

const RegisterPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Stack spacing={5} paddingX={3} flexDirection="column" align="center" justify="center" flex={1}>
      <Heading textAlign="center" mb={5}>
        Create an Account
      </Heading>

      <Button
        bg="black"
        color="white"
        as="a"
        {...{ href: "/api/auth/github" }}
        _hover={{ bg: "blackAlpha.800" }}
      >
        <Icon as={GithubIcon} size="24px" mr={2} />
        Continue with GitHub
      </Button>

      <Stack maxW="md" spacing={3} isInline align="center" w="100%">
        <Divider w="full" />
        <Box as="span" whiteSpace="nowrap" color="grey">
          Or use your email
        </Box>
        <Divider w="full" />
      </Stack>

      <Formik<RegisterInputType>
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values, { setFieldError, setStatus }) => {
          try {
            await register(values)
            await router.push("/dashboard")
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              setFieldError("email", "This email is already being used")
            } else {
              setStatus(error.toString())
            }
          }
        }}
        validate={(values) => {
          try {
            RegisterInput.parse(values)
          } catch (error) {
            return error.formErrors.fieldErrors
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Stack maxW="md" as={Form} width="full" shouldWrapChildren spacing={3}>
            <TextInput name="email" label="Email" />
            <TextInput name="name" label="Name" />
            <TextInput name="password" label="Password" type="password" />

            <Button variantColor="teal" width="full" type="submit" isLoading={isSubmitting}>
              Register
            </Button>

            <FormControl isInvalid={!!status}>
              <FormErrorMessage>{status}</FormErrorMessage>
            </FormControl>
          </Stack>
        )}
      </Formik>

      <BlitzLink href="/login">
        <Link mt={3}>Already have an account? Log in</Link>
      </BlitzLink>
    </Stack>
  )
}

RegisterPage.getLayout = (page) => <MainLayout title="Register">{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await getServerSidePropsPublicPage(ctx)
  return { props: {} }
}

export default RegisterPage
