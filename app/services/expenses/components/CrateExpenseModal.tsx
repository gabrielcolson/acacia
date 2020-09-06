import TextInput from "app/components/TextInput"
import { useSpaceInfoFromURL } from "app/hooks/useSpaceInfoFromURL"
import AmountInput from "app/services/expenses/components/AmountInput"
import createExpense from "app/services/expenses/mutations/createExpense"
import { CreateExpenseInput, CreateExpenseInputType } from "app/services/expenses/validations"
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
import { Form, Formik } from "formik"

export interface CreateExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  spaceId: string
}

const CreateExpenseModal = ({ isOpen, onClose }: CreateExpenseModalProps): JSX.Element => {
  const router = useRouter()
  const whereSpace = useSpaceInfoFromURL()

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...{ style: { paddingRight: 10, paddingLeft: 10 } }}>
      <ModalOverlay />

      <Formik<CreateExpenseInputType>
        initialValues={{ label: "", amount: 0, whereSpace }}
        onSubmit={async (values, { setStatus }) => {
          try {
            await createExpense(values)
            await router.push(
              "/[user]/[space]/expenses",
              `/${whereSpace.user}/${whereSpace.space}/expenses`
            )
          } catch (error) {
            setStatus(error.toString())
          }
        }}
        validate={(values) => {
          try {
            CreateExpenseInput.parse(values)
          } catch (error) {
            return error.formErrors.fieldErrors
          }
        }}
      >
        {({ isSubmitting }) => (
          <ModalContent
            mx={{ base: 5, xs: "auto" }}
            w="calc(100% - 2 * 20px)"
            as={Form}
            {...{ noValidate: true }}
            rounded="md"
          >
            <ModalHeader>Add a new Expense</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <TextInput name="label" label="label" isRequired />
              <AmountInput name="amount" label="amount (€)" />
            </ModalBody>

            <ModalFooter>
              <Button isLoading={isSubmitting} variantColor="teal" mr={3} type="submit">
                Add Expense
              </Button>

              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateExpenseModal
