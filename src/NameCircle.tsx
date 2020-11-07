import React, { FC } from "react";

type GravityProps = {
  svgHeight: number;
  name: string;
  colors: Array<string>;
};
const NameCircle: FC<GravityProps> = ({ svgHeight, name, colors }) => {
  const dark = colors[0];
  const light = colors[1];
  return (
    <g transform={`translate(${-265},${svgHeight / 3 + 30})`}>
    <circle
      cx={0}
      cy={0}
      r={50}
      fill={light}
      style={{ stroke: dark, strokeWidth: 8 }}
    />
    <text
      style={{
        fontSize: "0.8rem",
        textAnchor: "middle",
        transform: "translateY(0.2rem)",
        fill: dark,
      }}
    >
      {name}
    </text>
  </g>
  );
};

export default NameCircle;
