import React, { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Label } from "reactstrap";
import styled from "styled-components/macro";

// components
import InputGroupBorder from "./InputGroupBorder";
import { AutoSizedTextArea } from "./TextArea";
import { StyledError } from "../FormFieldRenderer";

const maxNumChars = 250;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 0.5em;
`;
// TODO: fix register
const TemplateTextArea = ({ field }) => {
  const methods = useFormContext();
  const message = useWatch({ name: field.name, control: methods.control, defaultValue: "" });
  const textAreaRef = useRef();

  return (
    <>
      <div className="d-flex justify-content-between mb-1">
        <span></span>
        <span className="charCount d-flex">
          {message.length <= maxNumChars && message.length > maxNumChars / 2
            ? <Circle $color="yellow" />
            : maxNumChars < message.length
              ? <Circle $color="red" />
              : <Circle $color="green" />}
          {message.length}/{maxNumChars} Characters
        </span>
      </div>
      <InputGroupBorder border="full">
        <AutoSizedTextArea
          inputProps={{
            type: "textarea",
            rows: "3",
            name: field.name,
          }}
          textAreaRef={textAreaRef}
          innerRef={(e) => methods.register(e, field.rules)}
        />
      </InputGroupBorder>
      <StyledError >{methods.errors[field.name]}</StyledError>
    </>
  );
};

export default TemplateTextArea;
