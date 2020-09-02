import { Link as BlitzLink } from "@blitzjs/core"
import { Button, Flex, FormControl, FormErrorMessage, Heading, Link, Stack } from "@chakra-ui/core"
import TextInput from "app/components/TextInput"
import { Form, Formik } from "formik"
import React from "react"
import { useRouter, BlitzPage } from "blitz"
import PublicLayout from "app/layouts/PublicLayout"
import login from "app/services/auth/mutations/login"
import { LoginInput } from "app/services/auth/validations"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Flex paddingX={3} flexDirection="column" align="center" justify="center" flex={1}>
      <Heading textAlign="center" mb={5}>
        Welcome back
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setFieldError, setStatus }) => {
          try {
            await login(values)
            await router.push("/dashboard")
          } catch (error) {
            if (error.name === "AuthenticationError") {
              // This error comes from Prisma
              console.log("auth error", error)
              setStatus("Invalid credentials")
            } else {
              console.log("error:", error)
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
          <Stack maxW="xl" as={Form} width="full" shouldWrapChildren spacing={3}>
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
        <Link mt={3}>No account yet? Register</Link>
      </BlitzLink>
    </Flex>
  )
}

LoginPage.getLayout = (page) => <PublicLayout title="Register">{page}</PublicLayout>

export default LoginPage
