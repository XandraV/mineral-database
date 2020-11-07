import React from "react";

const GravityCircle = (props) => {
  const dark = props.colors[0];
  const light = props.colors[1];
  return (
    <g
      transform={`translate( 110,${
        props.svgHeight / 2 - 100
      })`}
    >
      <circle r={60} fill={light}></circle>
      <text
        style={{
          fontSize: "0.7rem",
          textAnchor: "middle",
          fill: dark,
        }}
      >
        Specific Gravity
      </text>
      <text
        style={{
          fontSize: "0.7rem",
          textAnchor: "middle",
          fill: dark,
          transform: "translateY(1rem)",
        }}
      >
        {props.label}
      </text>
    </g>
  );
};

export default GravityCircle;