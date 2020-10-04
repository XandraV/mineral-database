import React, { useState } from "react";
import * as d3 from "d3";
import StyledTooltip from "./StyledTooltip";
import { bubbleData, labelsBubble } from "./data/bubbledata";
import styled from "styled-components/macro";

const BubbleWrapper = styled.div`
  padding-top: 0.5rem;
  padding-left: 3rem;
  svg > circle {
    @-webkit-keyframes slide-in-fwd-bottom {
      0% {
        -webkit-transform: translateZ(-1400px) translateY(800px);
        transform: translateZ(-1400px) translateY(800px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateZ(0) translateY(0);
        transform: translateZ(0) translateY(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-fwd-bottom {
      0% {
        -webkit-transform: translateZ(-1400px) translateY(800px);
        transform: translateZ(-1400px) translateY(800px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateZ(0) translateY(0);
        transform: translateZ(0) translateY(0);
        opacity: 1;
      }
    }
    -webkit-animation: slide-in-fwd-bottom 0.4s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-fwd-bottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
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
              key={i}
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

export default BubbleChart;
