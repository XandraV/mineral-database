import React, { useState } from "react";
import * as d3 from "d3";
import StyledTooltip from "./StyledTooltip";
import {
  heatmapdata,
  heatMapLabelsX,
  heatMapLabelsY,
} from "./data/heatmapdata";

function LabeledHeatmap() {
  const [hovered, setHovered] = useState(false);
  const svgHeight = 380;
  const svgWidth = 680;
  const chartWidth = 670;
  const chartHeight = 360;

  const xScale = d3
    .scaleLinear()
    .domain([0, heatMapLabelsX.length])
    .range([0, chartWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, heatMapLabelsY.length])
    .range([0, chartHeight]);

  const color = d3
    .scaleLinear()
    .domain([0, 2385])
    .range(["hsl(211, 100%, 89%)", "hsl(337, 100%, 79%)"]);

  return (
    <div>
      <StyledTooltip
        hovered={hovered}
        left={`${xScale(hovered.x) + 80}px`}
        top={`${yScale(hovered.y) + 30}px`}
      >
        {`${hovered.cellValue} minerals contain ${
          heatMapLabelsX[hovered.x]
        } and ${heatMapLabelsY[hovered.y]}`}
      </StyledTooltip>
      <svg width={svgWidth} height={svgHeight} style={{ overflow: "visible" }}>
        {heatmapdata.map((value, i) => (
          <rect
            key={i}
            className={value.cellValue}
            x={xScale(value.x) + 40}
            y={yScale(value.y) + 10}
            rx={4}
            ry={4}
            width={"2rem"}
            height={"2rem"}
            fill={color(value.cellValue)}
            onMouseOver={() => setHovered(value)}
            onMouseLeave={() => setHovered(false)}
          />
        ))}

        {xScale.ticks(heatMapLabelsX.length).map((value) => (
          <g key={value} transform={`translate(${xScale(value) + 30},0)`}>
            <text
              key={value}
              style={{
                fontSize: "0.8rem",
                textAnchor: "end",
                transform: "translateX(2rem)",
                fill: "grey",
              }}
            >
              {heatMapLabelsX[value]}
            </text>
          </g>
        ))}

        {yScale.ticks(heatMapLabelsY.length).map((value) => (
          <g key={value} transform={`translate(0,${yScale(value) + 30})`}>
            <text
              key={value}
              style={{
                fontSize: "0.8rem",
                textAnchor: "end",
                transform: "translateX(2rem)",
                fill: "grey",
              }}
            >
              {heatMapLabelsY[value]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default LabeledHeatmap;
