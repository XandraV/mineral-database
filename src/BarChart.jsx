import React, { useRef, useState } from "react";
import * as d3 from "d3";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";

const BarchartWrapper = styled(Paper)`
  height: 280px;
  width: 350px;
  border-radius: 0.9rem;
  padding-top: 1rem;
  overflow: "auto";
  flex-direction: column;
  background: white;
  text-align: center;

  p.title {
    font-size: 0.9rem;
    color: #b5b0b0;
    padding-bottom: 1.5rem;
    font-weight: bold;
    align-self: center;
  }

  p.barchart-legend {
    font-size: 0.75rem;
    color: #b5b0b0;
    font-weight: bold;
  }
`;

function BarChart(props) {
  const { selectedMineral } = props;
  const selectedElementNum = selectedMineral.formula?.length;
  const ref = useRef();
  const [selected, setSelected] = useState("");
  const svgWidth = 280;
  const svgHeight = 180;
  const chartHeight = 150;
  const data = [33, 385, 675, 1089, 1090, 569, 292, 157, 64, 36, 8, 4];

  const xScale = d3.scaleLinear().domain([0, 12]).range([0, 260]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartHeight]);
  const yAxisScale = d3.scaleLinear().domain([0, 1000]).range([150, 0]);

  const color = d3
    .scaleLinear()
    .domain([0, 12])
    .range(["hsl(323,66%,85%)", "hsl(35.8,100%,50%)"]);

  return (
    <BarchartWrapper>
      <Typography className="title" noWrap>
        Number of distinct elements in minerals
      </Typography>
      <svg
        width={svgWidth}
        height={svgHeight}
        ref={ref}
        style={{ overflow: "visible" }}
      >
        {data.map((d, i) => {
          return (
            <rect
              className={`bar${d}`}
              x={21 + i * 22}
              y={150 - yScale(d)}
              height={yScale(d)}
              width={18}
              fill={
                d === data[selectedElementNum - 1]
                  ? "lightgrey"
                  : d === selected
                  ? "lightblue"
                  : color(i)
              }
              onMouseOver={() => setSelected(d)}
              onMouseLeave={() => setSelected("")}
            />
          );
        })}
        
        <path
          d={["M", 10, 150, "v", -6, "V", -10, "v", 6].join(" ")}
          fill="none"
          stroke="lightgrey"
        />
        {yAxisScale.ticks(5).map((value) => (
          <g key={value} transform={`translate(0,${yAxisScale(value)})`}>
            <line x1="6" x2="14" stroke="lightgrey" />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "end",
                transform: "translateY(3px)",
                fill: "grey",
              }}
            >
              {value}
            </text>
          </g>
        ))}
        <path
          d={["M", 10, 150, "h", 0, "H", 280, "v", 0].join(" ")}
          fill="none"
          stroke="lightgrey"
        />
        {xScale.ticks(12).map((value) => {
          if (value !== 0) {
            return (
              <g key={value} transform={`translate(${xScale(value)+9},152)`}>
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
      <Typography className={"barchart-legend"} noWrap>
        {selected !== ""
          ? `${selected} contains ${
              data.indexOf(selected) + 1
            } distinct elements`
          : selectedMineral
          ? `${selectedMineral.name} contains ${selectedMineral.formula.length} distinct elements`
          : "# of elements"}
      </Typography>
    </BarchartWrapper>
  );
}

export default BarChart;
