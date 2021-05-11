import React from "react";
import Select from "react-select";
import { useFormContext, useWatch } from "react-hook-form";
import { getIn } from "../../utils";


const SelectField = ({ field }) => {
  const { register, setValue, control } = useFormContext();
  const selection = useWatch({ name: field.name, control })
  const inputProps = field.inputProps || {};
  const registry = register(field.name, field.rules);
  return (
    <Select
      {...inputProps}
      value={selection || null}
      {...registry}
      onChange={(selection_) => {
        setValue(field.name, selection_);

        // call onChange in case user needs to hook into this
        const onChangeHook = getIn(["inputProps", "onChange"], field, () => null);

        onChangeHook(selection_);
      }}
    />
  );
};
export default SelectField;
