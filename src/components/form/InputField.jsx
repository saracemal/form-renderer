import React, { useEffect } from "react";
import { Input } from "reactstrap";
import { useFormContext } from "react-hook-form";


const InputField = ({ field }) => {
  const { name, inputProps = {} } = field;
  const { register } = useFormContext();

  return (
    <Input
      key={name}
      name={name}
      {...inputProps}
      {...register(field.name, field.rules)}
    />
  );
};

export default InputField;
