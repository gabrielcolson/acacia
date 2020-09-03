import TextInput from "app/components/TextInput"
import { CreateSpaceInput } from "app/services/spaces/validations"
import { useRouter } from "blitz"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core"
import createSpace from "app/services/spaces/mutations/createSpace"
import { Form, Formik } from "formik"
import React from "react"

export interface CreateSpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateSpaceModal = ({ isOpen, onClose }: CreateSpaceModalProps): JSX.Element => {
  const router = useRouter()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values, { setStatus, setFieldError }) => {
          try {
            await createSpace(values)
            await router.push("/dashboard")
            onClose()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("name")) {
              // This error comes from Prisma
              setFieldError("name", "You already own a space with this name")
            } else {
              setStatus(error.toString())
            }
          }
        }}
        validate={(values) => {
          try {
            CreateSpaceInput.parse(values)
          } catch (error) {
            return error.formErrors.fieldErrors
          }
        }}
      >
        {({ isSubmitting }) => (
          <ModalContent as={Form} {...{ noValidate: true }}>
            <ModalHeader>Create a new Space</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <TextInput name="name" label="name" isRequired />
            </ModalBody>

            <ModalFooter>
              <Button isLoading={isSubmitting} variantColor="teal" mr={3} type="submit">
                Create Space
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateSpaceModal
