import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

export const mainListItems = (
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <ListItem button component={Link} to="/">
      <Tooltip title="Periodic Table" placement="right" style={{ width: 500 }}>
        <ListItemIcon
          style={{ minWidth: 0, paddingRight: 8, color: "#009faf" }}
        >
          <DashboardIcon />
        </ListItemIcon>
      </Tooltip>
    </ListItem>
    <ListItem button component={Link} to="/search">
      <Tooltip title="Search" placement="right" style={{ width: 500 }}>
        <ListItemIcon
          style={{ minWidth: 0, paddingRight: 8, color: "#009faf" }}
        >
          <i className="material-icons">search</i>
        </ListItemIcon>
      </Tooltip>
    </ListItem>
    <ListItem button component={Link} to="/statistics">
      <Tooltip title="Dashboard" placement="right" style={{ width: 500 }}>
        <ListItemIcon
          style={{ minWidth: 0, paddingRight: 8, color: "#009faf" }}
        >
          <BarChartIcon />
        </ListItemIcon>
      </Tooltip>
    </ListItem>
  </div>
);
