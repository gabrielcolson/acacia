import { Box, Button, Flex, Heading, Text } from "@chakra-ui/core"
import { ReactNode } from "react"
import { Formik, Form, FormikConfig } from "formik"

export interface SettingFormProps<T> {
  footerText: string
  children?: ReactNode
  initialValues: FormikConfig<T>["initialValues"]
  onSubmit: FormikConfig<T>["onSubmit"]
  title: string
  description: string
  variant?: "normal" | "danger"
  buttonLabel?: string
}

const SettingForm = <T extends object>({
  footerText,
  children,
  initialValues,
  onSubmit,
  title,
  description,
  variant = "normal",
  buttonLabel = "Save",
}: SettingFormProps<T>): JSX.Element => (
  <Box rounded="lg" borderWidth={1} w="full">
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Box as={Form}>
          <Box p={5} borderBottomWidth={1}>
            <Heading size="lg" as="h3">
              {title}
            </Heading>
            <Text my={3}>{description}</Text>
            {children}
          </Box>
          <Flex bg="teal.50" p={5} align="center">
            <Text flex={1}>{footerText}</Text>
            <Button
              size="md"
              type="submit"
              variantColor={variant === "normal" ? "teal" : "red"}
              isLoading={isSubmitting}
              minW="80px"
            >
              {buttonLabel}
            </Button>
          </Flex>
        </Box>
      )}
    </Formik>
  </Box>
)

export default SettingForm
