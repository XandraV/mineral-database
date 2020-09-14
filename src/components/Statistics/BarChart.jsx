import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalBarSeries,
  GradientDefs,
  MarkSeries
} from "react-vis";

function BarChart(props) {
  const [value, setValue] = useState(false);
  const BarSeries = VerticalBarSeries;
  /*conditional gradient depending on whether we have a mineral chosen or not */
  const gradient =
    props.point == null ? (
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
          onValueMouseOver={v => setValue(v)}
          onSeriesMouseOut={() => setValue(false)}
        />
        {props.point != null ? (
          <MarkSeries
            animation={true}
            colorType="literal"
            data={[{ x: props.point.formula.length, y: 1, color: "violet" }]}
          />
        ) : null}
        {value ? (
          <Hint value={value}>
            <HintContentBar value={value} />
          </Hint>
        ) : null}
      </XYPlot>
    </div>
  );
}

const StyledHint = withStyles({
  root: {
    backgroundColor: "rgb(105,105,105)",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
})(Paper);

function HintContentBar({ value }) {
  const { x, y } = value;
  return (
    <div>
      <StyledHint>
        <div className="hintBar">{`${y}${
          y > 1 ? " minerals" : " mineral"
        } contain ${x}${x > 1 ? " different elements" : " element"}`}</div>
      </StyledHint>
    </div>
  );
}
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
  { x: "12", y: 4 }
];
export default BarChart;
