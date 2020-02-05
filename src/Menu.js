import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ExploreIcon from "@material-ui/icons/Explore";
import CrystallizerIcon from "./CrystallizerIcon";
export function Menu(props) {
  return (
    <div>
      <AppBar
        position="fixed"
        className="appBar"
        style={{ zIndex: 1201, backgroundColor: "#009faf" }}
      >
        <Toolbar className="toolbar">
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="menu-header-text"
          >
            {props.title}
          </Typography>
          <CrystallizerIcon />
        </Toolbar>
      </AppBar>
      <SideBar />
    </div>
  );
}
const listIconStyle = { minWidth: 0, paddingRight: 8, color: "#009faf" };
export function SideBar() {
  return (
    <Drawer variant="permanent" className="drawerPaper">
      <List style={{ marginTop: "61px" }}>
        <div>
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
        </div>
      </List>
    </Drawer>
  );
}
