import React from "react";

const dark = "hsl(210, 99%, 69%)";
const light = "hsl(211, 100%, 89%)";

export const MainGroupCircle = (props) => {
  return (
    <g
      transform={`translate(${props.svgWidth / 2 - 170},${
        props.svgHeight / 2 + 20
      })`}
    >
      <circle r={60} fill={light}></circle>
      <text
        style={{
          fontSize: "1rem",
          textAnchor: "middle",
          fill: "white",
        }}
      >
        {props.label}
      </text>
    </g>
  );
};

export const SubGroupCircle = (props) => {
  return (
    <g
      transform={`translate(${props.svgWidth / 2 - 25},${
        props.svgHeight / 2 + 180
      })`}
    >
      <circle
        r={50}
        fill={dark}
        style={{ stroke: light, strokeWidth: 10 }}
      ></circle>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "white",
        }}
      >
        {props.label}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "white",
          transform: "translateY(1rem)",
        }}
      >
        subgroup
      </text>
    </g>
  );
};
