import React from "react";
import AppBar from "@material-ui/core/AppBar";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Drawer from "@material-ui/core/Drawer";
import ExploreIcon from "@material-ui/icons/Explore";
import Icon from "./Icon";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";

const MenuWrapper = styled.div`
  .appBar {
    z-index: 1201;
    background-color: #009faf;
  }
  .menu-header-text {
    flex-grow: 1;x
  }
`;

export const Menu = ({ ...props }) => {
  return (
    <MenuWrapper>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="menu-header-text"
          >
            {props.title}
          </Typography>
          {props.children}
          <Icon />
        </Toolbar>
      </AppBar>
      <SideBar />
    </MenuWrapper>
  );
};
const listIconStyle = { minWidth: 0, paddingRight: 8, color: "#009faf" };
export function SideBar() {
  return (
    <Drawer variant="permanent" className="drawerPaper">
      <List style={{ marginTop: "4.5em" }}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
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
        <ListItem button component={Link} to="/search">
          <Tooltip title="Search" placement="right" style={{ width: 500 }}>
            <ListItemIcon style={listIconStyle}>
              <i className="material-icons">search</i>
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
    </Drawer>
  );
}
