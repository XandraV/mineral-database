import React from "react";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExploreIcon from '@material-ui/icons/Explore';
import {Drawer, Tooltip, ListItemIcon} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import styled from "styled-components/macro";

const StyledDrawer = styled(Drawer)`
margin-right: 3.5rem;
.MuiListItem-gutters {
  padding-left: 0px;
  padding-right: 0px;
}
.MuiDrawer-paper {
    border: transparent;
    background: transparent;
    padding-left: 1.5rem;
    a {
      padding: 13px;
      border-radius: 1rem;
      background:#7689ef;
      border:1px solid white;
      margin-bottom: 10px;
    }
  }
`;

const IconWrapper = styled.div`
  padding-top: 0.5rem;

  @-webkit-keyframes wobble-hor-bottom {
    0%,
    100% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    15% {
      -webkit-transform: translateX(-10px) rotate(-6deg);
      transform: translateX(-10px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(5px) rotate(6deg);
      transform: translateX(5px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-5px) rotate(-3.6deg);
      transform: translateX(-5px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(3px) rotate(2.4deg);
      transform: translateX(3px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-3px) rotate(-1.2deg);
      transform: translateX(-3px) rotate(-1.2deg);
    }
  }
  @keyframes wobble-hor-bottom {
    0%,
    100% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    15% {
      -webkit-transform: translateX(-10px) rotate(-6deg);
      transform: translateX(-10px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(5px) rotate(6deg);
      transform: translateX(5px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-5px) rotate(-3.6deg);
      transform: translateX(-5px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(3px) rotate(2.4deg);
      transform: translateX(3px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-2px) rotate(-1.2deg);
      transform: translateX(-2px) rotate(-1.2deg);
    }
  }

  -webkit-animation: wobble-hor-bottom 1s 2s infinite both;
  animation: wobble-hor-bottom 1s 2s infinite both;
`;

const Icon = () => {
  return (
    <IconWrapper>
      <img
        alt="icon"
        src={`https://crystallizer.s3.eu-west-2.amazonaws.com/crystallizer.ico`}
        width={30}
        height={30}
      />
    </IconWrapper>
  );
};

const listIconStyle = {
  minWidth: 0,
  color: "white",
};

const Menu = () => {
  return (
    <StyledDrawer variant="permanent">
      <List>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <ListItem style={{display: "block", textAlign:"center"}}>
          <ListItemIcon style={listIconStyle}>
            <Icon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/">
          <Tooltip
            title="Periodic Table"
            placement="right"
            style={{ width: 500 }}
          >
            <ListItemIcon style={listIconStyle}>
              <DashboardIcon />
            </ListItemIcon>
          </Tooltip>
        </ListItem>
        <ListItem button component={Link} to="/statistics">
          <Tooltip title="Dashboard" placement="right" style={{ width: 500 }}>
            <ListItemIcon style={listIconStyle}>
              <BarChartIcon />
            </ListItemIcon>
          </Tooltip>
        </ListItem>
        <ListItem button component={Link} to="/map">
          <Tooltip title="Map" placement="right" style={{ width: 500 }}>
            <ListItemIcon style={listIconStyle}>
              <ExploreIcon />
            </ListItemIcon>
          </Tooltip>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Menu;
