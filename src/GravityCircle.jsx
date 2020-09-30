import React from "react";

const light = "hsl(211, 100%, 89%)";

const GravityCircle = (props) => {
  return (
    <g
      transform={`translate(${props.svgWidth / 2 + 110},${
        props.svgHeight / 2 - 100
      })`}
    >
      <circle r={60} fill={light}></circle>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "white",
        }}
      >
        Specific Gravity
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "white",
          transform: "translateY(1rem)",
        }}
      >
        {props.label}
      </text>
    </g>
  );
};

export default GravityCircle;