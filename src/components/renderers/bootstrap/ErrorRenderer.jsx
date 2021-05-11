import React, { useContext } from "react";
import { useFormState } from "react-hook-form";
import styled from "styled-components";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

export const StyledError = styled.span`
    color: var(--red);
    margin-top: 0.75em;
`;


const ErrorComponent = ({ field }) => {
  const { errors } = useFormState();
  const { message = "" } = errors[field.name] || {};

  return (
    <StyledError >{message}</StyledError>
  );
}

const LabelRenderer = ({ field }) => {
  const {
    overrides,
    rendererProps: { ErrorRenderer: props },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-error", field.name, props);
  const { OverrideError } = overrides[field.name] || {};
  const errorProps = { ...props, className };

  return OverrideError ? (
    <OverrideError field={field} {...props} />
  ) : (
    <ErrorComponent field={field}  {...errorProps} />
  );
};

export default LabelRenderer;
