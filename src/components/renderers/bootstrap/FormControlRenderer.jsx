import React from "react";

// utils
import { computeClasses } from "../utils";

const FormControlComponent = ({ field, renderers, overrides, ...formCtrlProps }) => {
  return (
    <div {...formCtrlProps}>
      <renderers.LabelRenderer field={field} overrides={overrides} />
      <renderers.InputRenderer field={field} overrides={overrides} />
      <renderers.ErrorRenderer field={field} overrides={overrides} />
    </div>
  )
};

const FormControlRenderer = ({ field, renderers, overrides, ...formCtrlProps }) => {
  const className = computeClasses("form-control", field.name, formCtrlProps);
  const { OverrideFieldControl } = overrides[field.name] || {};
  const formControlProps = { ...formCtrlProps, className };

  return OverrideFieldControl ? (
    <OverrideFieldControl overrides={overrides} field={field} {...formControlProps} renderers={renderers} />
  ) : (
    <FormControlComponent overrides={overrides} field={field} {...formControlProps} renderers={renderers} />
  );
};

export default FormControlRenderer;
