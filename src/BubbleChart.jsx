import React, { useState } from "react";
import * as d3 from "d3";
import { bubbleData, labelsBubble } from "./data/bubbledata";
import styled from "styled-components/macro";

const BubbleWrapper = styled.div`
  padding-top: 0.5rem;
  padding-left: 3rem;
`;

const StyledTooltip = styled.div`
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  position: absolute;
  text-align: center;
  width: 6rem;
  font-size: 0.7rem;
  height: 2.5rem;
  padding: 0.2rem;
  background: lightsteelblue;
  border-radius: 8px;
  color: white;
`;

function BubbleChart() {
  const [hovered, setHovered] = useState(false);
  const svgHeight = 300;
  const svgWidth = 680;
  const chartHeight = 260;
  const chartWidth = 660;
  const xScale = d3
    .scaleLinear()
    .domain([0, labelsBubble.length - 1])
    .range([0, chartWidth]);

  const yScale = d3.scaleLinear().domain([0, 3600]).range([chartHeight, 0]);

  const color = d3
    .scaleLinear()
    .domain([0, labelsBubble.length])
    .range(["hsl(211, 100%, 89%)", "hsl(337, 100%, 79%)"]);

  return (
    <BubbleWrapper>
      <StyledTooltip
        hovered={hovered}
        left={`${xScale(hovered.x) + 80}px`}
        top={`${yScale(hovered.y) + 30}px`}
      >
        {`${hovered.y} minerals contain ${labelsBubble[hovered.x]}`}
      </StyledTooltip>
      <svg width={svgWidth} height={svgHeight} style={{ overflow: "visible" }}>
        <path
          d={["M", 5, 260, "v", -6, "V", -10, "v", 6].join(" ")}
          fill="none"
          stroke="#e6e6e9"
          strokeWidth="0.1rem"
        />

        {yScale.ticks(7).map((value) => (
          <g key={value} transform={`translate(0,${yScale(value)})`}>
            <line x1="1" x2="9" stroke="lightgrey" />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "end",
                transform: "translateX(-5px)",
                fill: "grey",
              }}
            >
              {value}
            </text>
          </g>
        ))}

        <path
          d={["M", 5, 260, "h", 0, "H", 665, "v", 0].join(" ")}
          stroke="#e6e6e9"
          strokeWidth="0.1rem"
        />
        {xScale.ticks(labelsBubble.length - 1).map((value) => {
          if (value !== 0) {
            return (
              <g key={value} transform={`translate(${xScale(value)},260)`}>
                <line y1="-270" y2="5" stroke="#e6e6e9" />
                <text
                  key={value}
                  style={{
                    fontSize: "10px",
                    textAnchor: "middle",
                    transform: "translateY(20px)",
                    fill: "grey",
                  }}
                >
                  {labelsBubble[value]}
                </text>
              </g>
            );
          }
        })}
        {bubbleData.map((bubble, i) => {
          return (
            <circle
              cx={`${xScale(bubble.x)}`}
              cy={`${yScale(bubble.y)}`}
              r={`${bubble.y / 100}`}
              fill={`${color(i)}`}
              onMouseOver={() => setHovered(bubble)}
              onMouseLeave={() => setHovered(false)}
            />
          );
        })}
      </svg>
    </BubbleWrapper>
  );
}

// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   MarkSeriesCanvas,
//   Hint
// } from "react-vis";

// function BubbleChart() {
//   const [data] = useState(bubbleData);
//   const [value, setValue] = useState(false);
//   const markSeriesProps = {
//     animation: true,
//     sizeRange: [1, 35],
//     colorRange: ["orange", "pink", "lightBlue"],
//     data,
//     onNearestXY: value => setValue(value)
//   };
//   return (
//     <div style={{ padding: 5 }}>
//       <XYPlot
//         margin={{ left: 50 }}
//         yDomain={[0, 3900]}
//         onMouseLeave={() => setValue(false)}
//         width={720}
//         height={400}
//       >
//         <VerticalGridLines tickTotal={43} />
//         <XAxis
//           tickFormat={v => labelsBubble[v - 1]}
//           tickTotal={43}
//           tickSize={1}
//         />
//         <YAxis />
//         <MarkSeriesCanvas {...markSeriesProps} />
//         {value ? (
//           <Hint value={value}>
//             <HintContentBubble value={value} />
//           </Hint>
//         ) : null}
//       </XYPlot>
//     </div>
//   );
// }

// function HintContentBubble({ value }) {
//   const { x, y } = value;
//   return (
//     <div>
//       {hintRowBubble({ numberOfMinerals: y, components: labelsBubble[x - 1] })},
//     </div>
//   );
// }

// function hintRowBubble({ numberOfMinerals, components }) {
//   return (
//     <Paper
//       style={{
//         backgroundColor: "rgb(105,105,105)",
//         alignItems: "center",
//         borderRadius: 4,
//         padding: 8,
//         display: "flex",
//         overflow: "auto",
//         flexDirection: "column"
//       }}
//     >
//       <div style={{ fontSize: "12px", color: "white" }}>
//         {numberOfMinerals}
//         {numberOfMinerals > 1 ? " minerals" : " mineral"}
//         {" contain "}
//         {components}
//       </div>
//     </Paper>
//   );
// }

export default BubbleChart;
