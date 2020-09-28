import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import SunburstBreadcrumbs from "./SunburstBreadcrumbs";
import { dataSunburst } from "./data/sunburstData";
import { Hint, Sunburst } from "react-vis";
import styled from "styled-components/macro";

const StyledHint = styled.div`
  display: "flex";
  color: black;
  background: white;
  align-items: "center";
  padding: 5px;
  border-radius: 5px;

  .inner {
    height: 10px;
    width: 10px;
  }
`;

const StyledAvatar = styled.div`
  margin-top: -300px;
  padding-left: 125px;
  color: black;
  position: absolute;
`;

function SunburstChart() {
  const [hoveredCell, setHoveredCell] = useState(false);
  const [hoveredParent, setHoveredParent] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Sunburst
          hideRootNode
          colorType="literal"
          data={dataSunburst}
          height={400}
          width={450}
          style={{
            stroke: "#fff",
            text: { color: "#ffffff" },
          }}
          onValueMouseOver={(v) => {
            setHoveredCell(v.x && v.y ? v : false);
            setHoveredParent(v.parent.data);
          }}
        >
          {hoveredCell ? (
            <Hint
              value={{
                x: hoveredCell.x,
                y: hoveredCell.y,
              }}
            >
              <StyledHint>
                <div className="inner" />
                {hoveredCell.title}
              </StyledHint>
            </Hint>
          ) : null}
        </Sunburst>
        {hoveredCell ? <SunburstAvatar hoveredCell={hoveredCell} /> : null}
      </Grid>
      <Grid item>
        <div>
          {hoveredCell ? (
            <SunburstBreadcrumbs
              hoveredCell={hoveredCell}
              hoveredParent={hoveredParent}
            />
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
}

function SunburstAvatar(props) {
  return (
    <StyledAvatar>
      <Avatar
        alt="avatar"
        src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${props.hoveredCell.title
          .toString()
          .toLowerCase()}.svg`}
        style={{ width: 200, height: 200 }}
      />
    </StyledAvatar>
  );
}

export default SunburstChart;
