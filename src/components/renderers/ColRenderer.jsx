import React from "react";
import { Col } from "reactstrap";

// utils
import { computeClasses } from "./utils";

const ColRenderer = ({ field, overrides, renderers, ...colProps }) => {
  const sizes = field.colSize || colProps.colSize; // allow field to define a col size or default to computed one
  const className = computeClasses("col", field.name, colProps);

  return (
    <Col {...colProps} className={className} {...sizes}>
      <renderers.FormControlWrapperRenderer field={field} renderers={renderers} overrides={overrides} />
    </Col>
  );
};

export default ColRenderer;
