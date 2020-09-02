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
  label: string
}

const TextInput = ({ name, label, ...rest }: TextInputProps): JSX.Element => {
  const [field, meta] = useField(name)

  const isInvalid = !!meta.error && meta.touched

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput {...rest} {...field} isInvalid={isInvalid} id={name} placeholder={label} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextInput
