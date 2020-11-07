import React from "react";
import * as d3 from "d3";
import Tooltip from "@material-ui/core/Tooltip";
import {
  heatmapdata,
  heatMapLabelsX,
  heatMapLabelsY,
} from "./data/heatmapdata";
import styled from "styled-components/macro";

const StyledHeatmap = styled.div`
  margin-top: 2rem;
  padding-bottom: 0;
  svg {
    overflow: visible;
    @-webkit-keyframes scale-in-hor-center {
      0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        opacity: 1;
      }
    }
    @keyframes scale-in-hor-center {
      0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        opacity: 1;
      }
    }
    -webkit-animation: scale-in-hor-center 0.5s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
`;

const LabeledHeatmap = () => {
  const svgHeight = 220;
  const svgWidth = 730;
  const chartWidth = 670;
  const chartHeight = 210;

  const xScale = d3
    .scaleLinear()
    .domain([0, heatMapLabelsX.length])
    .range([0, chartWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, heatMapLabelsY.length])
    .range([0, chartHeight]);

  const color = d3
    .scaleLinear<string>()
    .domain([0, 2385])
    .range(["hsl(211, 100%, 89%)", "hsl(337, 100%, 79%)"]);

  return (
    <StyledHeatmap>
      <svg width={svgWidth} height={svgHeight}>
        {heatmapdata.map((value, i) => (
          <Tooltip
            key={`rect-${i}`}
            title={`${value.cellValue} minerals contain ${
              heatMapLabelsX[value.x]
            } and ${heatMapLabelsY[value.y]}`}
            aria-label="haha"
            placement="right"
          >
            <rect
              key={i}
              className={`${value.cellValue}`}
              x={xScale(value.x) + 40}
              y={yScale(value.y) + 10}
              rx={4}
              ry={4}
              stroke="white"
              width={"2rem"}
              height={"2rem"}
              fill={color(value.cellValue)}
            />
          </Tooltip>
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
    </StyledHeatmap>
  );
};

export default LabeledHeatmap;
