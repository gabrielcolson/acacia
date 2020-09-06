import { GetServerSideProps, Link as BlitzLink } from "@blitzjs/core"
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
import GithubIcon from "app/components/icons"
import TextInput from "app/components/TextInput"
import MainLayout from "app/layouts/MainLayout"
import { getServerSidePropsPublicPage } from "app/services/auth/auth-utils"
import { Form, Formik } from "formik"
import React from "react"
import { useRouter, BlitzPage } from "blitz"
import login from "app/services/auth/mutations/login"
import { LoginInput } from "app/services/auth/validations"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Stack spacing={5} paddingX={3} flexDirection="column" align="center" justify="center" flex={1}>
      <Heading textAlign="center">Welcome back</Heading>

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

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setStatus }) => {
          try {
            await login(values)
            await router.push("/dashboard")
          } catch (error) {
            if (error.name === "AuthenticationError") {
              // This error comes from Prisma
              setStatus("Invalid credentials")
            } else {
              setStatus(error.toString())
            }
          }
        }}
        validate={(values) => {
          try {
            LoginInput.parse(values)
          } catch (error) {
            return error.formErrors.fieldErrors
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Stack maxW="md" as={Form} width="full" shouldWrapChildren spacing={3}>
            <TextInput name="email" label="Email" />

            <TextInput name="password" label="Password" type="password" />

            <Button
              variantColor="teal"
              color="white"
              width="full"
              type="submit"
              isLoading={isSubmitting}
            >
              Log in
            </Button>

            <FormControl isInvalid={!!status}>
              <FormErrorMessage>{status}</FormErrorMessage>
            </FormControl>
          </Stack>
        )}
      </Formik>

      <BlitzLink href="/register">
        <Link>No account yet? Register</Link>
      </BlitzLink>
    </Stack>
  )
}

LoginPage.getLayout = (page) => <MainLayout title="Log in">{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await getServerSidePropsPublicPage(ctx)
  return { props: {} }
}

export default LoginPage
