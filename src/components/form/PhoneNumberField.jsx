import React from "react";
import InputMask from "react-input-mask";

// components
import InputField from "./InputField";

const PhoneNumberField = ({ field }) => {
  const { mask = "(999) 999-9999", maskPlaceholder = null } = field.inputProps || {};

  return (
    <InputMask mask={mask} maskPlaceholder={maskPlaceholder}>
      <InputField field={field} />
    </InputMask>
  );
};

export default PhoneNumberField;
