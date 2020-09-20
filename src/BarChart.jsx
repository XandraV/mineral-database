import * as d3 from "d3";
import React, { useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function BarChart(props) {
  const ref = useRef();
  const [selected, setSelected] = useState("");
  const width = 280;
  const height = 150;
  const data = [33, 385, 675, 1089, 1090, 569, 292, 157, 64, 36, 8, 4];

  const xScale = d3.scaleLinear().domain([0, 12]).range([0, 260]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

  const color = d3
    .scaleLinear()
    .domain([0, 12])
    .range(["hsl(323,66%,85%)", "hsl(35.8,100%,50%)"]);

  const svg = d3.select(ref.current);
  const selection = svg.selectAll("rect").data(data);

  selection
    .enter()
    .append("rect")
    .on("mouseover", function (_, d) {
      setSelected(d);
      d3.selectAll(`rect.bar${d}`).style("fill", "lightblue");
    })
    .on("mouseleave", function (_, d) {
      setSelected("");
      d3.selectAll(`rect.bar${d}`).style("fill", color(data.indexOf(d)));
    })
    .attr("class", function (d, i) {
      return "bar" + d;
    })
    .attr("x", (d, i) => 21 + i * 22)
    .attr("y", (d) => height)
    .attr("width", 18)
    .attr("height", 0)
    .style("fill", function (d, i) {
      return color(i);
    })
    .transition()
    .duration(300)
    .attr("height", (d) => yScale(d))
    .attr("y", (d) => height - yScale(d));

  if (props.chosenMineral != null) {
    const elementNum = props.chosenMineral.formula.length;
    d3.selectAll(`rect.bar${data[elementNum - 1]}`).style("fill", "lightgrey");
  }

  const yAxisScale = d3.scaleLinear().domain([0, 1000]).range([150, 0]);

  return (
    <Paper className="barchart-container">
      <Typography className="barchart-title" noWrap>
        Number of distinct elements in minerals
      </Typography>
      <svg
        width={width}
        height={height}
        ref={ref}
        style={{ overflow: "visible" }}
      >
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
      </svg>

      <svg height={20} width={260} style={{ overflow: "visible" }}>
        <path
          d={["M", 0, 1, "v", -6, "H", 280, "v", 6].join(" ")}
          fill="none"
          stroke="lightgrey"
        />
        {xScale.ticks(12).map(function (value) {
          if (value === 0) {
            return;
          } else {
            return (
              <g key={value} transform={`translate(${xScale(value)},-3)`}>
                <line y2="6" stroke="lightgrey" />
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
        {selected != ""
          ? `${selected} contains ${
              data.indexOf(selected) + 1
            } distinct elements`
          : props.chosenMineral != null
          ? `${props.chosenMineral.name} contains ${props.chosenMineral.formula.length} distinct elements`
          : "# of elements"}
      </Typography>
    </Paper>
  );
}

export default BarChart;
