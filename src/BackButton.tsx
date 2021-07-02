import React from "react";
import { useHistory } from "react-router-dom";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import styled from "styled-components/macro";

const StyledBackLink = styled.div`
  color: white;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  a {
    color: inherit;

    img {
      margin-left: 10px;
    }
  }
  a:hover {
    color: inherit;
    text-decoration: underline;
  }
`;

const BackButton = () => {
  const history = useHistory();
  return (
    <StyledBackLink onClick={() => history.goBack()}>
      <NavigateBeforeIcon />
      Back
    </StyledBackLink>
  );
};

export default BackButton;
