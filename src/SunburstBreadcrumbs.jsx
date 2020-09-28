import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { groupInfoText } from "./data/sunburstData";
import styled from "styled-components/macro";

const StyledGroupInfo = styled.div`
  padding-top: 1rem;
  width: 220px;
  text-align: justify;

  p {
    font-size: 12px;
  }
`;

function SunburstBreadcrumbs(props) {
  const chipCellStyle = {
    backgroundColor: props.hoveredCell.color,
    color: "white",
    fontWeight: "bold",
  };
  const chipParentCellStyle = {
    backgroundColor: props.hoveredParent.color,
    color: "white",
    fontWeight: "bold",
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
            <Chip label={props.hoveredCell.title} style={chipCellStyle} />
          </Breadcrumbs>
        )}
      </Paper>
      <StyledGroupInfo>
        <Typography>{groupInfoText}</Typography>
      </StyledGroupInfo>
    </div>
  );
}

export default SunburstBreadcrumbs;
