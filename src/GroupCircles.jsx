import React from "react";

export const MainGroupCircle = (props) => {
  const dark = props.colors[0];
  const light = props.colors[1];
  return (
    <g transform={`translate(${-170},${props.svgHeight / 2 + 20})`}>
      <circle r={60} fill={light}></circle>
      <text
        style={{
          fontSize: "0.9rem",
          textAnchor: "middle",
          fill: dark,
        }}
      >
        {props.label}
      </text>
    </g>
  );
};

export const SubGroupCircle = (props) => {
  const dark = props.colors[0];
  const light = props.colors[1];
  return (
    <g transform={`translate(${-25},${props.svgHeight / 2 + 180})`}>
      <circle
        r={50}
        fill={dark}
        style={{ stroke: light, strokeWidth: 10 }}
      ></circle>
      <text
        style={{
          fontSize: "0.7rem",
          textAnchor: "middle",
          fill: "white",
        }}
      >
        {props.label}
      </text>
      <text
        style={{
          fontSize: "0.7rem",
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
