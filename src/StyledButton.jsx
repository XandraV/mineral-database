import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  button.button-create {
    background: #009faf;
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
    background: #009faf;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
`;

function StyledButton(props) {
  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        className="button-create"
        onClick={props.onClick}
      >
        Create mineral
      </Button>
    </ButtonWrapper>
  );
}
export default StyledButton;
