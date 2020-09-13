import { useRouter } from "@blitzjs/core"
import { Box, BoxProps, Button, Flex, FormControl, FormErrorMessage } from "@chakra-ui/core"
import TextInput from "app/components/TextInput"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import addMember from "app/services/spaces/mutations/addMember"
import { AddMemberInput, AddMemberInputType } from "app/services/spaces/validations"
import { Form, Formik } from "formik"
import React from "react"

export type AddMemberFormProps = BoxProps

const AddMemberForm = (props: AddMemberFormProps): JSX.Element => {
  const whereSpace = useSpaceInfoFromURL()
  const router = useRouter()

  return (
    <Formik<AddMemberInputType>
      initialValues={{ email: "", whereSpace }}
      onSubmit={async (values, { setFieldError, setStatus }) => {
        try {
          await addMember(values)
          router.reload()
        } catch (error) {
          if (error.code === "P2016") {
            setFieldError("name", "This user doesn't exist")
          } else {
            setStatus(error.toString())
          }
        }
      }}
      validate={(values) => {
        try {
          AddMemberInput.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Box as={Form} {...{ noValidate: true, ...props }}>
          <Flex>
            <TextInput name="email" type="email" placeholder="demo@demo.com" w="full" mr={3} />
            <Button isLoading={isSubmitting} variantColor="teal" type="submit">
              Add Member
            </Button>
          </Flex>
          <FormControl isInvalid={!!status}>
            <FormErrorMessage>{status}</FormErrorMessage>
          </FormControl>
        </Box>
      )}
    </Formik>
  )
}

export default AddMemberForm
