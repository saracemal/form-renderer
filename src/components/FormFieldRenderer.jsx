import React from "react";
import { useFormState } from "react-hook-form";
import { Label, Col, FormGroup, Row } from "reactstrap";
import styled from "styled-components/macro";

// components
import InputGroupBorder from "./form/InputGroupBorder";
import PhoneNumberField from "./form/PhoneNumberField";
import Select from "./form/SelectField";
import InputField from "./form/InputField";
import { renderers as renderers_ } from "./renderers";


// utils
import { getIn } from "../utils";

export const RedSpan = styled.span`
  color: red !important;
`;

export const StyledError = styled.span`
  color: var(--red);
  margin-top: 0.75em;
`;

export const RedAsterisk = () => <RedSpan>*</RedSpan>;

// TODO: Move the validators out on their own field
export const emailPatternParams = {
  pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Invalid Email address",
  },
};
export const requiredParams = { required: { value: true, message: "Required" } };
export const phoneRegex = {
  pattern: {
    value: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i,
    message: "Invalid Phone number",
  },
};

export const validatePhone = (phone) =>
  phone.replace(/\D/g, "").length === 10 ? undefined : "Must be 10 digits";

/////////////////////////////////////////////////////////


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

const RenderLabel = ({ field }) => {
  const shouldShowAsterisk = () => {
    if (typeof field.rules === "function") {
      // special case when we pass `rules` as a function
      return getIn(["required"], field.rules({}));
    }
    return getIn(["rules", "required"], field);
  };

  const isFieldRequired = shouldShowAsterisk();

  return (
    <div className="d-flex">
      <Label htmlFor={field.name}>
        {field.label}
        {isFieldRequired ? <RedAsterisk /> : null}
      </Label>
    </div>
  );
};

const getWrapperComponent = (field) => {
  return (
    field.fieldWrapper || (shouldWrapWithBorder(field) && InputGroupBorder) || "div"
  );
};

const RenderFormField = ({ field }) => {
  const { errors } = useFormState();
  const InputComponent = getFormInputType(field.component);
  const inputProps = field.inputProps || {};
  const Wrapper = getWrapperComponent(field);

  return (
    <Wrapper disabled={inputProps.disabled} error={errors[field.name]}>
      <InputComponent field={field} />
    </Wrapper>
  );
};

const RenderError = ({ field }) => {
  const { errors } = useFormState();
  const { message = "" } = errors[field.name] || {};

  return (
    <StyledError >{message}</StyledError>
  );
};

const renderGroupedFields = ({ idx, fields, overrides, renderers }) => {
  const colSize = 12 / fields.length;
  return (
    <Row key={idx}>
      {fields.map((field) => {
        const { OverrideFieldControl, OverrideLabel, OverrideError, OverrideInput } =
          overrides[field.name] || {};
        return field.name ? (
          <Col xs={colSize} md={colSize} key={field.name}>
            <FormGroup>
              {OverrideFieldControl ? (
                <OverrideFieldControl field={field} />
              ) : (
                <>
                  {OverrideLabel
                    ? <OverrideLabel field={field} />
                    : <RenderLabel field={field} />}
                  {OverrideInput
                    ? <OverrideInput field={field} />
                    : <RenderFormField field={field} />}
                  {OverrideError
                    ? <OverrideError field={field} />
                    : <RenderError field={field} />}
                </>
              )}
            </FormGroup>
          </Col>
        ) : null;
      })}
    </Row>
  );
};

/**
 * Possibly move this into the /services/api folder
 * This assumes that the endpoint returns either an object of field errors
 * OR general errors
 */
export const fetchServerErrorMessage = (resErrors) => {
  //let serverErrors = resErrors.data.non_field_errors || []; // comment out to see if this is the correct response or not
  let serverErrors = [];
  let fieldErrors = [];

  if (Array.isArray(resErrors.data)) {
    serverErrors = resErrors.data;
  } else {
    Object.entries(resErrors.data).forEach(([field, errors]) => {
      let message = "";
      if (Array.isArray(errors)) {
        errors.map((error) => (message += `${error}|`));
        fieldErrors.push({ type: "validate", name: field, message });
      }
    });
  }

  return { serverErrors, fieldErrors };
};

export const renderServerErrorMessages = (errors) => {
  return (
    <>
      {errors.map((error, idx) => (
        <StyledError key={idx}>{error}</StyledError>
      ))}
    </>
  );
};

const FormFieldsRenderer = ({ fields, overrides = {} }) => {
  const renderers = renderers_;
  return (
    <>
      {fields.map((group, idx) =>
        <renderers.RowRenderer fields={group} id={idx} renderers={renderers} overrides={overrides} />
      )}
    </>
  );
};

export default React.memo(FormFieldsRenderer);
