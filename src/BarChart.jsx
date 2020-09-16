import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components/macro";
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalBarSeries,
  GradientDefs,
  MarkSeries,
} from "react-vis";

const barData = [
  { x: "1", y: 33 },
  { x: "2", y: 385 },
  { x: "3", y: 675 },
  { x: "4", y: 1089 },
  { x: "5", y: 1090 },
  { x: "6", y: 569 },
  { x: "7", y: 292 },
  { x: "8", y: 157 },
  { x: "9", y: 64 },
  { x: "10", y: 36 },
  { x: "11", y: 8 },
  { x: "12", y: 4 },
];
const StyledHint = withStyles({
  root: {
    backgroundColor: "rgb(105,105,105)",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
})(Paper);

const StyledHintBar = styled.div`
  font-size: 0.75em;
  color: white;
`;

function BarChart(props) {
  const [value, setValue] = useState(false);
  const BarSeries = VerticalBarSeries;
  /*conditional gradient depending on whether we have a mineral chosen or not */
  const gradient =
    props.choosenMineral == null ? (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
        >
          <stop offset="10%" stopColor="orange" />
          <stop offset="50%" stopColor="pink" />
          <stop offset="90%" stopColor="lightBlue" />
        </linearGradient>
      </GradientDefs>
    ) : (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
        >
          <stop offset="100%" stopColor="lightGrey" />
        </linearGradient>
      </GradientDefs>
    );

  return (
    <Paper className="barchart-container">
      <Typography className="barchart-title" noWrap>
        Number of distinct elements in minerals
      </Typography>
      <div>
        <XYPlot
          xType="ordinal"
          width={300}
          height={200}
          xDistance={100}
          color={"url(#myGradient)"}
        >
          {gradient}
          <XAxis />
          <YAxis />
          <BarSeries
            className="vertical-bar-series-example"
            data={barData}
            onValueMouseOver={(v) => setValue(v)}
            onSeriesMouseOut={() => setValue(false)}
          />
          {value ? (
            <Hint value={value}>
              <HintContentBar value={value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
      <Typography className="barchart-legend" noWrap>
        {props.chosenMineral != null
          ? `${props.chosenMineral.name} contains ${props.chosenMineral.formula.length} distinct elements`
          : "# of elements"}
      </Typography>
    </Paper>
  );
}

const HintContentBar = ({ value }) => {
  const { x, y } = value;
  return (
    <div>
      <StyledHint>
        <StyledHintBar>{`${y}${y > 1 ? " minerals" : " mineral"} contain ${x}${
          x > 1 ? " different elements" : " element"
        }`}</StyledHintBar>
      </StyledHint>
    </div>
  );
}

export default BarChart;
