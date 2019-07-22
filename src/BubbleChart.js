import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { bubbleData } from "./bubbledata";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  MarkSeriesCanvas,
  Hint
} from "react-vis";

class BubbleChart extends Component {
  state = {
    data: bubbleData,
    value: false
  };

  render() {
    const { data } = this.state;
    const markSeriesProps = {
      animation: true,
      sizeRange: [1, 35],
      colorRange: ["orange", "pink", "lightBlue"],
      data,
      onNearestXY: value => this.setState({ value })
    };

    return (
      <div style={{ padding: 5 }}>
        <XYPlot
          margin={{ left: 50 }}
          yDomain={[0, 3900]}
          onMouseLeave={() => this.setState({ value: false })}
          width={750}
          height={400}
        >
          <VerticalGridLines tickTotal={43} />
          <XAxis
            tickFormat={v => labelsBubble[v - 1]}
            tickTotal={43}
            tickSize={1}
          />
          <YAxis />
          <MarkSeriesCanvas {...markSeriesProps} />
          {this.state.value ? (
            <Hint value={this.state.value}>
              <HintContentBubble value={this.state.value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

function HintContentBubble({ value }) {
  const { x, y } = value;
  return (
    <div>
      {hintRowBubble({ numberOfMinerals: y, components: labelsBubble[x - 1] })},
    </div>
  );
}

function hintRowBubble({ numberOfMinerals, components }) {
  return (
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
      <div style={{ fontSize: "12px", color: "white" }}>
        {numberOfMinerals}
        {numberOfMinerals > 1 ? " minerals" : " mineral"}
        {" contain "}
        {components}
      </div>
    </Paper>
  );
}

const labelsBubble = [
  "H",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "K",
  "Ca",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "As",
  "Se",
  "Zr",
  "Nb",
  "Mo",
  "Ru",
  "Rh",
  "Ag",
  "Sn",
  "Sb",
  "Te",
  "Ba",
  "Ce",
  "Au",
  "Hg",
  "Pb",
  "U"
];

export default BubbleChart;