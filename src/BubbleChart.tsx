import React from "react";
import * as d3 from "d3";
import Tooltip from "@material-ui/core/Tooltip";
import { bubbleData, labelsBubble } from "./data/bubbledata";
import { BubbleChartWrapper } from "./BubbleChartWrapper";
import styled from "styled-components/macro";

const StyledCircle = styled.circle`
  transition: 0.3s;
  :hover {
    r: 25;
  }
`;
const BubbleChart = () => {
  const svgHeight = 170;
  const svgWidth = 480;
  const chartHeight = 120;
  const chartWidth = 460;
  const xScale = d3
    .scaleLinear()
    .domain([0, labelsBubble.length - 1])
    .range([0, chartWidth]);

  const yScale = d3.scaleLinear().domain([0, 3600]).range([chartHeight, 0]);

  const color = d3
    .scaleLinear<string>()
    .domain([0, labelsBubble.length])
    .range(["rgba(240, 244, 239)","rgba(170,135,244)"]);

  return (
    <BubbleChartWrapper>
      <svg width={svgWidth} height={svgHeight} style={{ overflow: "visible" }}>
        {yScale.ticks(3).map((value) => (
          <g key={`num-${value}`} transform={`translate(0,${yScale(value)})`}>
            <text
              style={{
                fontSize: 10,
                textAnchor: "end",
                transform: "translateX(-15px)",
                fill: "white",
              }}
            >
              {value}
            </text>
          </g>
        ))}

        <path
          d={["M", 0, chartHeight, "h", 0, "H", 480, "v", 0].join(" ")}
          stroke="lightgrey"
          strokeWidth={0.2}
        />
        {xScale.ticks(labelsBubble.length - 1).map(
          (value) =>
            value !== 0 &&
            value !== 36 && (
              <g
                key={`symbol-${value}`}
                transform={`translate(${xScale(value)},${chartHeight})`}
              >
                <text
                  style={{
                    fontSize: "0.8rem",
                    textAnchor: "middle",
                    transform: "translateY(20px)",
                    fill: "white",
                  }}
                >
                  {labelsBubble[value]}
                </text>
              </g>
            )
        )}
        {bubbleData.map(
          (bubble, i) =>
            bubble.y !== 0 && (
              <Tooltip
                key={`circle-${i}`}
                title={`${bubble.y} minerals contain ${labelsBubble[i]}`}
                aria-label="haha"
                placement="right"
              >
                <StyledCircle
                  cx={`${xScale(bubble.x)}`}
                  cy={`${yScale(bubble.y)}`}
                  r={`${bubble.y / 100 + 5}`}
                  fill={`${color(i)}`}
                 // stroke={"white"}
                />
              </Tooltip>
            )
        )}
      </svg>
    </BubbleChartWrapper>
  );
};

export default BubbleChart;
