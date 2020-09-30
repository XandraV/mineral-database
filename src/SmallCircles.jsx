import React from "react";
const dark = "hsl(210, 99%, 69%)";
const light = "hsl(211, 100%, 89%)";

export const SystemText = (props) => {
  return (
    <g transform={`translate(${props.svgWidth / 2 + 120},${props.svgHeight / 2 + 190})`}>
      <line y2="20" stroke={light} strokeWidth={5}></line>
      <circle
        cx={0}
        cy={20}
        r={5}
        fill={dark}
        style={{ stroke: light, strokeWidth: 5 }}
      ></circle>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "grey",
          transform: "translateY(2.5rem)",
        }}
      >
        {props.label}
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "grey",
          transform: "translateY(3.5rem)",
        }}
      >
        crystal structure
      </text>
    </g>
  );
};

export const HardnessText = (props) => {
  return (
    <g transform={`translate(${props.svgWidth / 2 + 100},${props.svgHeight / 2 })`}>
      <line x2="20" stroke={light} strokeWidth={5}></line>
      <circle
        cx={20}
        cy={0}
        r={5}
        fill={dark}
        style={{ stroke: light, strokeWidth: 5 }}
      ></circle>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "grey",
          transform: "translate(4rem, 0)",
        }}
      >
      Hardness
      </text>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "grey",
          transform: "translate(3.5rem, 1rem)",
        }}
      >{props.label}
      </text>
    </g>
  );
};

export const ColorText = (props) => {
  return (
    <g transform={`translate(${props.svgWidth / 2},${props.svgHeight / 2 - 100 })`}>
      <line y2="-30" stroke={light} strokeWidth={5}></line>
      <circle
        cx={0}
        cy={-30}
        r={5}
        fill={dark}
        style={{ stroke: light, strokeWidth: 5 }}
      ></circle>
      <text
        style={{
          fontSize: "0.8rem",
          textAnchor: "middle",
          fill: "grey",
          transform: "translateY(-3rem)",
        }}
      >{props.label}
      </text>
    </g>
  );
};
