import React from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  .back-btn {
    color: white;
    font-size: 30px;
    vertical-align: middle;
  }
`;

const BackButton = () => {
  return (
    <ButtonWrapper>
      <IconButton
        color="inherit"
        aria-label="Menu"
        onClick={() => localStorage.clear()}
      >
        <NavLink to="/">
          <i className="material-icons back-btn">arrow_back_ios</i>
        </NavLink>
      </IconButton>
    </ButtonWrapper>
  );
};
export default BackButton;
