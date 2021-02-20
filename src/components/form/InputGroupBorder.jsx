import React from "react";
import styled, { css } from "styled-components";
import { InputGroup } from "reactstrap";

const StyledInputGroup = styled(InputGroup)`
  --borderCol: ${(props) =>
    props.error
      ? "var(--red)"
      : props.readonly
        ? "var(--darkGray)"
        : "var(--mediumGray)"};
  --borderSize: 1px;
  --border: var(--borderSize) solid var(--borderCol) !important;

  border-top: ${(props) => (props.border === "full" ? "var(--border)" : "0")};
  border-right: ${(props) => (props.border === "full" ? "var(--border)" : "0")};
  border-bottom: var(--border);
  border-left: ${(props) => (props.border === "full" ? "var(--border)" : "0")};

  textarea {
    padding-left: var(--pad2);
    padding-right: var(--pad2);
  }

  &.hasTextarea {
    padding-bottom: 0.7rem;
    align-items: flex-end !important;
  }
  ${(props) =>
    props.theme.isDesktop
      ? css`
          --borderSize: 2px;
          input {
            cursor: text;
          }
        `
      : null}
`;

function InputGroupBorder(props) {
  return (
    <StyledInputGroup
      border={props.border}
      error={props.error}
      readOnly={props.readonly}
      className={props.className + " inputGroup"}
    >
      {props.children}
    </StyledInputGroup>
  );
}

export default InputGroupBorder;
