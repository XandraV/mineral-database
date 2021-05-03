import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  button.button-create {
    background: #7689EF;
    border-radius: 1rem;
    border: 0.09em solid white;
    color: white;
    height: 40px;
    padding-top: 0 20px;
    font-weight: bold;

    @-webkit-keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }

    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      1s both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;
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
