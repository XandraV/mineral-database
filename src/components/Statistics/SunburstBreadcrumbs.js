import React from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { groupInfoText } from "./sunburstData";

function SunburstBreadcrumbs(props) {
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
      <div>
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
              <Chip
                label={props.hoveredCell.title}
                style={chipCellStyle}
              />
            </Breadcrumbs>
          )}
        </Paper>
        <Divider
          variant="middle"
        />
        <div className="group-info-sunburst">
          <Typography>
            {groupInfoText}
          </Typography>
        </div>
      </div>
    );
  }

export default SunburstBreadcrumbs;