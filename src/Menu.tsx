import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MineralContext } from "./MineralContextProvider";
import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components/macro";

const StyledAppBar = styled(AppBar)`
  && {
    background: transparent;
    padding: 32px;
    padding-bottom: 30px;
    box-shadow: none;
    position: relative;
  }
  .link-wrapper {
    margin: auto;
  }
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  font-family: Rosario;
  position: relative;
  text-decoration: none;
  color: white;
  opacity: 0.7;
  margin-left: 2rem;
  font-weight: bold;
  transition: 0.3s;
  margin: 0 40px 0 40px;
  &.active {
    opacity: 1;
    font-size: 16px;
  }
  :hover {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-family: Sedgwick Ave Display;
  font-size: 14px;
  color: white;
  div:first-child {
    font-size: 20px;
  }
`;

const navTitles = ["HOME", "PERIODIC TABLE", "ELEMENTS", "MAP"];

const Menu = () => {
  const { activeMenu, setActiveMenu } = useContext(MineralContext);
  useEffect(() => {
    if (window.location.pathname) {
      const menu = window.location.pathname.split("/")[1].toUpperCase();
      setActiveMenu(menu === "" ? "HOME" : menu);
    }
  });

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Title>
          <div>MINERAL</div>
          <div>DATABASE</div>
        </Title>
        {window.location.pathname !== "/" && (
          <div className="link-wrapper">
            {navTitles.map((title: string) =>
              title.split(" ")[0] === activeMenu ? (
                <StyledLink
                  key={title}
                  to={`/${
                    title === "HOME" ? "" : title.split(" ")[0]
                  }`.toLowerCase()}
                  className={"active"}
                  onClick={() => setActiveMenu(title)}
                >
                  {title}
                </StyledLink>
              ) : (
                <StyledLink
                  key={title}
                  to={`/${
                    title === "HOME" ? "" : title.split(" ")[0]
                  }`.toLowerCase()}
                  onClick={() => setActiveMenu(title)}
                >
                  {title}
                </StyledLink>
              )
            )}
          </div>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Menu;
