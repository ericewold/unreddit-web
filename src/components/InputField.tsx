import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaProps & {
    label: string;
    name: string;
    placeholder?: string;
    textarea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  placeholder,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let InputOrTextArea = (
    <Input {...field} {...props} id={field.name} placeholder={placeholder} />
  );
  if (textarea) {
    InputOrTextArea = (
      <Textarea
        {...field}
        {...props}
        id={field.name}
        placeholder={placeholder}
      />
    );
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {InputOrTextArea}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
