import React from "react";
import { Input } from "reactstrap";
import { useFormContext } from "react-hook-form";


const InputField = ({ field }) => {
  const { name, inputProps = {} } = field;
  const { register } = useFormContext();

  return (
    <Input
      name={name}
      {...inputProps}
      innerRef={(el) => register(el, field.rules)}
    />
  );
};

export default InputField;
