import React, { FC } from "react";
import Footer from "./Footer";
import styled from "styled-components/macro";

const StyledWrapper = styled.div`
  background-image: radial-gradient(ellipse at top, #838bfc, transparent),
    radial-gradient(ellipse at bottom, #ffb016, #ffb016);
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
