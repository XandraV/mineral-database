import React, { FC } from "react";
type GroupProps = {
  colors: Array<string>;
  label: string | Array<string>;
  svgHeight: number;
};
export const MainGroupCircle: FC<GroupProps> = ({
  svgHeight,
  colors,
  label,
}) => {
  const dark = colors[0];
  const light = colors[1];
  return (
    <g transform={`translate(${-170},${svgHeight / 2 + 20})`}>
      <circle r={60} fill={light}></circle>
      <text
        style={{
          fontSize: "0.9rem",
          textAnchor: "middle",
          fill: dark,
          transform: "translateY(-1rem)",
        }}
      >
        {label}
      </text>
      <text
        style={{
          fontSize: "0.6rem",
          textAnchor: "middle",
          fill: "#ac99cc",
        }}
      >
        maingroup
      </text>
    </g>
  );
};

export const SubGroupCircle: FC<GroupProps> = ({
  svgHeight,
  colors,
  label,
}) => {
  const dark = colors[0];
  const light = colors[1];
  return (
    <g transform={`translate(${-25},${svgHeight / 2 + 180})`}>
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
        {label}
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
