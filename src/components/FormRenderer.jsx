import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "reactstrap";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components/macro";


import FormFieldsRenderer, { StyledError } from "./FormFieldRenderer";
import { LoadingButton } from "./Buttons";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.position === "right"
      ? "flex-end"
      : props.position === "left"
        ? "flex-start"
        : props.position === "center"
          ? "center"
          : null};
  align-items: center;
  /** if there are two buttons, only apply the style on the last last child */
  button:first-child:nth-last-child(2),
  button:first-child:nth-last-child(1) ~ button {
    margin-right: var(--pad1);
  }
`;

ButtonsContainer.propTypes = {
  /** This determine the position of the buttons in the container */
  position: PropTypes.oneOf(["right", "left", "center"]),
};
ButtonsContainer.defaultProps = {
  position: "right",
};

const FormRenderer = ({
  fields = [],
  overrides = {},
  onSubmit: submit,
  defaultValues = {},
  buttonProps = { name: "Submit", block: false, className: "" },
  formWrapper = null,
  formId = "",
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState("");
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = (body) => {
    setSubmitting(true);
    submit({
      setError: methods.setError,
      data: body,
      setServerError: setNonFieldErrors,
      setSubmittingState: setSubmitting,
    });
  };
  const Wrapper = formWrapper ? formWrapper : React.Fragment;

  return (
    <FormProvider {...methods}>
      <Form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
        <Wrapper>
          <FormFieldsRenderer
            fields={fields}
            overrides={overrides}
          />
          {nonFieldErrors.length ? (
            <div className="text-center">
              {nonFieldErrors.map((error, index) => (
                <StyledError key={index}>{error}</StyledError>
              ))}
            </div>
          ) : null}
        </Wrapper>
        <ButtonsContainer>
          <LoadingButton
            color="primary"
            className={`${buttonProps.className}`}
            type="submit"
            data-test="form-submit"
            value={buttonProps.name}
            loading={submitting}
            disabled={submitting}
            {...buttonProps}
          >
            {buttonProps.name}
          </LoadingButton>
        </ButtonsContainer>
      </Form>
    </FormProvider>
  );
};

FormRenderer.propTypes = {
  /** The fields that will be part of the form */
  fields: PropTypes.array.isRequired,
  /** Any overrides to be passed down to the FormFieldsRenderer styles. */
  overrides: PropTypes.object,
  /** The submit action of the form */
  onSubmit: PropTypes.func.isRequired,
  /** Default values to prepopulate the form on display */
  defaultValues: PropTypes.object,
  /** Additional props for the Submit button */
  buttonProps: PropTypes.object,
  /** Custom Styled Wrapper on the form */
  formWrapper: PropTypes.elementType,
  /** Id of the form (used in conjunction with hasRemoteSubmitBtn) */
  formId: PropTypes.string,
};

FormRenderer.defaultProps = {
  fields: [],
  overrides: {},
  defaultValues: {},
  buttonProps: { name: "Submit", block: false, className: "" },
  hasRemoteSubmitBtn: false,
};

export default React.memo(FormRenderer);
