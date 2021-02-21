import React, { useEffect } from "react";
import Select from "react-select";
import { useFormContext } from "react-hook-form";

// Ignore `innerRef` that is passed
const SelectField = ({ field }) => {
  const { register, watch, setValue, unregister } = useFormContext();
  const selection = watch(field.name);
  const inputProps = field.inputProps || {};

  useEffect(() => {
    register({ name: field.name }, field.rules);
    return () => {
      console.log("BOOOM")
      setValue(field.name, field.inputProps.isMulti ? [] : null);
      unregister(field.name);
    };
    // eslint-disable-next-line
  }, [register, setValue, unregister]);

  return (
    <Select
      {...inputProps}
      value={selection || null}
      onChange={(selection_) => {
        setValue(field.name, selection_);

        // call onChange in case user needs to hook into this
        const { inputProps: { onChange: onChangeHook = () => null } = {} } = field;

        onChangeHook(selection_);
      }}
    />
  );
};
export default SelectField;
