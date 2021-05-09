import React from "react";
import { Label } from "reactstrap";

// components
import { RedAsterisk } from "../FormFieldRenderer";

// utils
import { computeClasses } from "./utils";
import { getIn } from "../../utils";

const shouldShowAsterisk = (field) => {
  if (typeof field.rules === "function") {
    // special case when we pass `rules` as a function
    return getIn(["required"], field.rules({}));
  }
  return getIn(["rules", "required"], field);
};

// TODO: revise why we need the `div` wrapper
const FieldLabelComponent = ({ field, ...props }) => {
  const isFieldRequired = shouldShowAsterisk(field);

  return (
    <div style={{ display: "flex" }}>
      <Label {...props} htmlFor={field.name}>
        {field.name}
        {isFieldRequired ? <RedAsterisk /> : null}
      </Label>
    </div>
  );
};

const LabelRenderer = ({ field, renderers, overrides, ...props }) => {
  const className = computeClasses("form-control-label", field.name, props);
  const { OverrideLabel } = overrides[field.name] || {};
  const labelProps = { ...props, className };
  return OverrideLabel ? (
    <OverrideLabel field={field} {...props} />
  ) : (
    <FieldLabelComponent field={field}  {...labelProps} />
  );
};

export default LabelRenderer;
