import React, { FC } from "react";
import Footer from "./Footer";
import styled from "styled-components/macro";
//  background: conic-gradient(from 140deg at 60% 50%, #be2a7a, #75649c, #be2a7a);
//  background: conic-gradient(from 140deg at 60% 50%, #ad005e, #220f6f, #ad005e);
const StyledWrapper = styled.div`
  background: conic-gradient(from 140deg at 60% 50%, #be2a7a, #75649c, #be2a7a);
  #content {
    padding: 0 80px 0 80px;
    display: grid;
    min-height: ${window.innerHeight + 50}px;
  }
  text-align: center;
  height: 100%;
  width: 100%;
  *:focus {
    outline: none;
  }
`;

const PageWrapper: FC = ({ children }) => (
  <StyledWrapper>
    <div id={"content"}>{children}</div>
    <Footer />
  </StyledWrapper>
);

export default PageWrapper;
