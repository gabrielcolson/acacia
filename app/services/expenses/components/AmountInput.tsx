import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/core"
import { useField } from "formik"

export interface AmountInputProps {
  name: string
  label: string
}

const AmountInput = ({ name, label }: AmountInputProps): JSX.Element => {
  const [field, meta, { setValue, setTouched }] = useField(name)
  const isInvalid = !!meta.error && meta.touched

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput
        {...field}
        precision={2}
        isInvalid={isInvalid}
        onBlur={() => setTouched(true)}
        onChange={setValue}
      >
        <NumberInputField inputMode="numeric" />
      </NumberInput>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default AmountInput
