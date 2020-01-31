import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
function SunburtsBreadcrumb(props) {
  const chipCellStyle = {
    backgroundColor: props.hoveredCell.color,
    color: "white",
    fontWeight: "bold"
  };
  const chipParentCellStyle = {
    backgroundColor: props.hoveredParent.color,
    color: "white",
    fontWeight: "bold"
  };
  return (
      <Paper elevation={0}>
        {props.hoveredCell.category === "Group" ? (
          <Chip label={props.hoveredCell.title} style={chipCellStyle} />
        ) : (
          <Breadcrumbs
            separator="›"
            aria-label="Breadcrumb"
            style={{ fontSize: 15, color: "black" }}
          >
            <Chip
              label={props.hoveredParent.title}
              style={chipParentCellStyle}
            />
            <Chip label={props.hoveredCell.title} style={chipCellStyle} />
          </Breadcrumbs>
        )}
      </Paper>
      
  );
}

export default SunburtsBreadcrumb;
