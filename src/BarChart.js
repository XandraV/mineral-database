import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import {
    XYPlot,
    XAxis,
    YAxis,
    Hint,
    VerticalBarSeries,
    GradientDefs,
    MarkSeries,
  } from "react-vis";
  
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }
  render() {
    const BarSeries = VerticalBarSeries;
    /*conditional gradient depending on whether we have a mineral choosen or not */
    const gradient =
      this.props.point == null ? (
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
            onValueMouseOver={v => this.setState({ value: v })}
            onSeriesMouseOut={v => this.setState({ value: false })}
          />
          {this.props.point != null ? (
            <MarkSeries
              animation={true}
              colorType="literal"
              data={[
                { x: this.props.point.formula.length, y: 1, color: "violet" }
              ]}
            />
          ) : null}
          {this.state.value ? (
            <Hint value={this.state.value}>
              <HintContentBar value={this.state.value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

export function HintContentBar({ value }) {
  const { x, y } = value;
  return (
    <div>
      <Paper
        style={{
          backgroundColor: "rgb(105,105,105)",
          alignItems: "center",
          borderRadius: 4,
          padding: 8,
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        }}
      >
        <div style={{ fontSize: "12px", color: "white" }}>{`${y}${
          y > 1 ? " minerals" : " mineral"
        } contain ${x}${x > 1 ? " different elements" : " element"}`}</div>
      </Paper>
      ,
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
