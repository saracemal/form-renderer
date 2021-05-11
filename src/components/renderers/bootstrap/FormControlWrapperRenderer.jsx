import React, { useContext } from "react";
import { FormGroup } from "reactstrap";

// utils
import { computeClasses } from "../utils";
import { FormRendererContext } from "../../FormRenderer";

const FormControlWrapperRenderer = ({ field }) => {
  const {
    overrides,
    renderers,
    rendererProps: { FormControlWrapperRenderer: formCtrlWrapperProps },
  } = useContext(FormRendererContext);
  const className = computeClasses("form-control-wrapper", field.name, formCtrlWrapperProps);
  return (
    <FormGroup {...formCtrlWrapperProps} className={className}>
      <renderers.FormControlRenderer field={field} renderers={renderers} overrides={overrides} />
    </FormGroup>
  );
};

export default FormControlWrapperRenderer;
