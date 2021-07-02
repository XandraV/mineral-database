import React from "react";
import styled from "styled-components/macro";

const StyledFooter = styled.footer`
  height: 50px;
  width: 100%;
  background: #00000026;
  font-size: 14px;
  color: white;
  padding: 10px 100px 0 100px;
  margin-top:50px;
  a {
    color: inherit;
    text-decoration: none;
    float: left;
  }

  div {
    float: right;
  }
`;

const Footer = () => (
  <StyledFooter>
    <a href="https://github.com/XandraV/" target="_blank" rel="noreferrer">
      GitHub |
    </a>
    <a
      href="https://www.linkedin.com/in/alexandra-veres-14974212b/"
      target="_blank"
      rel="noreferrer"
    >
      LinkedIn
    </a>
    <div>Updated 2021</div>
  </StyledFooter>
);

export default Footer;
