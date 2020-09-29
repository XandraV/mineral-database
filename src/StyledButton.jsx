import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  button.button-create {
    background: hsl(210, 100%, 56%);
    border-radius: 25px;
    border: 0px;
    color: white;
    height: 48px;
    padding: 0 20px;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
    transition: all 0.3s ease 0s;
    font-weight: bold;
  }
  button.button-create:hover {
    transform: translateY(-7px);
    background: hsl(210, 100%, 56%);
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
`;

const StyledButton = ({ ...props }) => {
  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        className="button-create"
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </ButtonWrapper>
  );
};
export default StyledButton;
