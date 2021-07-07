import React, { FC, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components/macro";
import Tooltip from "@material-ui/core/Tooltip";

const BarchartWrapper = styled.div`
  margin-right: 30px;
  position: relative;
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
  selectedMineral: { formula: string };
};
const BarChart: FC<BarChartProps> = ({ selectedMineral }) => {
  const selectedElementNum = selectedMineral?.formula?.length || 0;
  const [selected, setSelected] = useState<number | string>("");
  const svgWidth = 280;
  const svgHeight = 150;
  const chartHeight = 130;
  const data = [33, 385, 675, 1089, 1090, 569, 292, 157, 64, 36, 8, 4];

  const xScale = d3.scaleLinear().domain([0, 12]).range([0, 260]);
  const yScale = d3.scaleLinear().domain([0, 1090]).range([0, chartHeight]);
  const yAxisScale = d3.scaleLinear().domain([0, 1000]).range([130, 0]);
  console.log(selected);
  const color = d3
    .scaleLinear<string>()
    .domain([0, 12])
    .range(["rgba(211, 79, 115)", "rgba(170,135,244)"]);

  return (
    <BarchartWrapper>
      <svg width={svgWidth} height={svgHeight} style={{ overflow: "visible" }}>
        {data.map((d, i) => (
          <Tooltip
            key={`bar-${i}`}
            title={`${d} minerals contain ${i} elements`}
            aria-label="haha"
            placement={i < 4 ? "left" : "right"}
            color="white"
          >
            <rect
              key={d}
              className={`bar${d}`}
              x={21 + i * 22}
              y={chartHeight - yScale(d)-10}
              rx={7}
              ry={7}
              height={yScale(d)+10}
              width={18}
              fill={d === selected ? "#FFFAF3" : `${color(i)}`}
              onMouseOver={() => setSelected(d)}
              onMouseLeave={() => setSelected("")}
            />
          </Tooltip>
        ))}

        {yAxisScale.ticks(4).map((value) => (
          <g key={value} transform={`translate(0,${yAxisScale(value)})`}>
            <text
              key={value}
              style={{
                fontSize: 10,
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
          d={["M", 10, chartHeight, "h", 0, "H", 290, "v", 0].join(" ")}
          fill="none"
          stroke="lightgrey"
          strokeWidth={0.5}
        />
        {xScale.ticks(12).map(
          (value) =>
            value !== 0 && (
              <g
                key={value}
                transform={`translate(${xScale(value) + 9},${chartHeight})`}
              >
                <line y2="5" stroke="lightgrey" strokeWidth={0.5}/>
                <text
                  key={value}
                  style={{
                    fontSize: 10,
                    textAnchor: "middle",
                    transform: "translateY(20px)",
                    fill: "white",
                  }}
                >
                  {value}
                </text>
              </g>
            )
        )}
      </svg>
    </BarchartWrapper>
  );
};

export default BarChart;
