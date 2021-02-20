import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";
import styled from "styled-components";

const StyledSpinnerContainer = styled.div`
  position: relative;
  line-height: inherit;
  z-index: ${(props) => (props.isLoading ? "-100" : "auto")};
  width: 100%;
`;

const StyledText = styled.span`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
`;

const StyledBtn = styled(Button)`
  display: ${(props) => (props.disabled ? "inherit" : "block")};
`;

const OverlayedSpinner = styled.span`
  z-index: 100;
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  .spinner-border {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
  }
`;

const setSpinnerSize = (size) => {
  switch (size) {
    case "lg":
      return "1.8rem";
    case "sm":
      return "1rem";
    default:
      return "1.4rem";
  }
};
const LoadingButton = ({ loading, children, spinnerProps = {}, ...rest }) => {
  const { size = setSpinnerSize(rest.size), color = "white" } = spinnerProps;

  return (
    <StyledBtn disabled={loading} {...rest}>
      <StyledSpinnerContainer isLoading={loading}>
        <StyledText isLoading={loading}>{children}</StyledText>
        {loading ? (
          <OverlayedSpinner size={size}>
            <Spinner color={color} />
          </OverlayedSpinner>
        ) : null}
      </StyledSpinnerContainer>
    </StyledBtn>
  );
};

LoadingButton.propTypes = {
  spinnerProps: PropTypes.shape({
    size: PropTypes.string,
    color: PropTypes.string,
  }),
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default LoadingButton;
