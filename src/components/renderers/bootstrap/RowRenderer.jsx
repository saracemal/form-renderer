import React from "react";
import { Row } from "reactstrap";

// utils
import { computeClasses } from "../utils";

const RowRenderer = ({ id, fields, renderers, overrides, children, ...rowProps }) => {
  // compute default col size(can be overriden by `field`)
  const colSize = 12 / fields.length;
  const sizes = { xs: colSize, md: colSize };
  // NOTE: Check if we're prop drilling too much -- if so then wrap this in a context

  // compute classes
  const className = computeClasses("row", id, rowProps);
  return (
    <Row {...rowProps} className={className}>
      {
        fields.map((field) => (
          <renderers.ColRenderer colSize={sizes} field={field} renderers={renderers} overrides={overrides} />
        ))
      }
    </Row>
  );
};

export default RowRenderer;
