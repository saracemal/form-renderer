import React from "react";
import { Input } from "reactstrap";

export const AutoSizedTextArea = ({
  textAreaRef,
  inputProps,
  innerRef = () => null,
  onChange = () => null,
}) => {
  const onTextAreaChange = (e) => {
    textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
    onChange(e);
  };

  return (
    <Input
      {...inputProps}
      innerRef={(e) => {
        innerRef(e);
        textAreaRef.current = e;
      }}
      onChange={onTextAreaChange}
    />
  );
};
