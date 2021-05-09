import React from "react";
import { FormGroup } from "reactstrap";

// utils
import { computeClasses } from "./utils";

const FormControlWrapperRenderer = ({ field, renderers, overrides, ...formCtrlWrapperProps }) => {
  const className = computeClasses("form-control-wrapper", field.name, formCtrlWrapperProps);
  return (
    <FormGroup {...formCtrlWrapperProps} className={className}>
      <renderers.FormControlRenderer field={field} renderers={renderers} overrides={overrides} />
    </FormGroup>
  );
};

export default FormControlWrapperRenderer;
