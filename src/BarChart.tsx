import React, { FC, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components/macro";

const BarchartWrapper = styled.div`
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1rem;
  overflow: "auto";

  flex-direction: column;
  text-align: center;
  svg > rect {
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

type BarChartProps = {
  selectedMineral: {formula: string}
}
const BarChart:FC<BarChartProps> = ({selectedMineral}) => {
  const selectedElementNum = selectedMineral?.formula?.length || 0;
  const [selected, setSelected] = useState<number|string>("");
  const svgWidth = 280;
  const svgHeight = 150;
  const chartHeight = 130;
  const data = [33, 385, 675, 1089, 1090, 569, 292, 157, 64, 36, 8, 4];

  const xScale = d3.scaleLinear().domain([0, 12]).range([0, 260]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 1090])
    .range([0, chartHeight]);
  const yAxisScale = d3.scaleLinear().domain([0, 1000]).range([130, 0]);

  const color = d3
    .scaleLinear<string>()
    .domain([0, 12])
    .range(["hsl(211, 100%, 89%)", "hsl(337, 100%, 79%)"]);

  return (
    <BarchartWrapper>
      <svg width={svgWidth} height={svgHeight} style={{ overflow: "visible" }}>
        {data.map((d, i) => {
          return (
            <rect
              key={d}
              className={`bar${d}`}
              x={21 + i * 22}
              y={chartHeight - yScale(d)}
              rx={7}
              ry={7}
              height={yScale(d)}
              stroke={"white"}
              width={18}
              fill={
                selectedMineral
                  ? d === data[selectedElementNum - 1]
                    ? "#ff94bd"
                    : d === selected
                    ? "#ff94bd"
                    : "lightgrey"
                  : d === selected
                  ? "#ff94bd"
                  : `${color(i)}`
              }
              onMouseOver={() => setSelected(d)}
              onMouseLeave={() => setSelected("")}
            />
          );
        })}

        {yAxisScale.ticks(4).map((value) => (
          <g key={value} transform={`translate(0,${yAxisScale(value)})`}>
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "end",
                transform: "translateY(-3px)",
                fill: "white",
              }}
            >
              {value}
            </text>
          </g>
        ))}
        <path
          d={["M", 10, chartHeight, "h", 0, "H", 280, "v", 0].join(" ")}
          fill="none"
          stroke="white"
        />
        {xScale.ticks(12).map((value) => {
          if (value !== 0) {
            return (
              <g
                key={value}
                transform={`translate(${xScale(value) + 9},${chartHeight})`}
              >
                <line y2="5" stroke="lightgrey" />
                <text
                  key={value}
                  style={{
                    fontSize: "10px",
                    textAnchor: "middle",
                    transform: "translateY(20px)",
                    fill: "grey",
                  }}
                >
                  {value}
                </text>
              </g>
            );
          }
        })}
      </svg>
    </BarchartWrapper>
  );
}

export default BarChart;
