import React, { useContext } from "react";
import { useFormState } from "react-hook-form";

// components
import Select from "../../form/SelectField";
import InputField from "../../form/InputField";
import PhoneNumberField from "../../form/PhoneNumberField";
import InputGroupBorder from "../../form/InputGroupBorder";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";


const getFormInputType = (inputType) => {
  switch (inputType) {
    case "phone":
      return PhoneNumberField;
    case "select":
      return Select;
    case "number":
    case "textarea":
    case "input":
    default:
      return InputField;
  }
};

const shouldWrapWithBorder = (field) => {
  // NOTE: add here all the other options that require a border
  return (
    field.component === "input" ||
    field.component === "number" ||
    field.component === "phone"
  );
};

const getWrapperComponent = (field) => {
  return (
    field.fieldWrapper || (shouldWrapWithBorder(field) && InputGroupBorder) || "div"
  );
};

// TODO: we need to move the supported `input types` as a prop that needs to be sent in
const InputComponent = ({ field, ...props }) => {
  const { errors } = useFormState()
  const InputComponent = getFormInputType(field.component);
  const inputProps = field.inputProps || {};
  const Wrapper = getWrapperComponent(field);

  return (
    <Wrapper disabled={inputProps.disabled} error={errors[field.name]}>
      <InputComponent field={field} {...props} />
    </Wrapper>
  );
};

const InputRenderer = ({ field }) => {
  const {
    overrides,
    rendererProps: { InputRenderer: inputProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-input", field.name, inputProps);
  const { OverrideInput } = overrides[field.name] || {};
  const props = { ...inputProps, className };

  return OverrideInput ? (
    <OverrideInput field={field} {...props} />
  ) : (
    <InputComponent field={field} {...props} />
  );
};

export default InputRenderer;
