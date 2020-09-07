import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components/macro";
const ButtonWrapper = styled.span`
  button.apply {
    margin-left: 10px;
    background: #009faf;
    border-radius: 25px;
    border: 0px;
    color: white;
    height: 40px;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
    transition: all 0.3s ease 0s;
    font-weight: bold;
  }
  button.apply:hover {
    transform: translateY(-7px);
    background: #009faf;
  }
`;

function ApplyButton(props) {
  return (
    <ButtonWrapper>
      <Button
        className="apply"
        variant="contained"
        onClick={props.onClick}
      >{props.children}</Button>
    </ButtonWrapper>
  );
}

export default ApplyButton;
