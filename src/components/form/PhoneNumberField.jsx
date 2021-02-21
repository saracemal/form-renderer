import React from "react";
import InputMask from "react-input-mask";

// components
import InputField from "./InputField";

const PhoneNumberField = ({ field }) => {
  const { mask = "(999) 999-9999", maskPlaceholder = null } = field.inputProps || {};
  // NOTE: there seems to be a bug with react-input-mask
  // that doesn't make the mask work properly
  return (
    <InputMask mask={mask} maskPlaceholder={maskPlaceholder}>
      <InputField field={field} />
    </InputMask>
  );
};

export default PhoneNumberField;
