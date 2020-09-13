import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/core"
import { useField } from "formik"

export interface TextInputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
}

const TextInput = ({ name, type, label, placeholder, ...rest }: TextInputProps): JSX.Element => {
  const [field, meta] = useField(name)

  const isInvalid = !!meta.error && meta.touched

  return (
    <FormControl isInvalid={isInvalid} {...rest}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        {...field}
        type={type}
        isInvalid={isInvalid}
        id={name}
        placeholder={placeholder || label}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextInput
