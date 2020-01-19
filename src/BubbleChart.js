import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { bubbleData, labelsBubble } from "./bubbledata";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  MarkSeriesCanvas,
  Hint
} from "react-vis";

function BubbleChart() {
    const [ data ] = useState(bubbleData);
    const [ value, setValue ] = useState(false);
    const markSeriesProps = {
      animation: true,
      sizeRange: [1, 35],
      colorRange: ["orange", "pink", "lightBlue"],
      data,
      onNearestXY: value => setValue(value)
    };
    return (
      <div style={{ padding: 5 }}>
        <XYPlot
          margin={{ left: 50 }}
          yDomain={[0, 3900]}
          onMouseLeave={() => setValue(false)}
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
          {value ? (
            <Hint value={value}>
              <HintContentBubble value={value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
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

export default BubbleChart;