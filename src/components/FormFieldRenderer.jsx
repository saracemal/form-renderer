import React from "react";
import styled from "styled-components/macro";

// components
import { renderers as renderers_ } from "./renderers/bootstrap";

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
