import React, { FC } from "react";

type GravityProps = {
  svgHeight: number;
  label: string;
  colors: Array<string>;
};
const GravityCircle: FC<GravityProps> = ({ svgHeight, label, colors }) => {
  const dark = colors[0];
  const light = colors[1];
  return (
    <g transform={`translate( 110,${svgHeight / 2 - 100})`}>
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
        {label}
      </text>
    </g>
  );
};

export default GravityCircle;
