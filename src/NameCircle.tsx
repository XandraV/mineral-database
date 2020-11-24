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
    <g transform={`translate(${-130},${svgHeight / 2 -100})`}>
    <circle
       cx={0}
       cy={0}
       r={60}
       fill={dark}
       style={{ stroke: light, strokeWidth: 17 }}
    />
    <text
      style={{
        fontSize: "0.7rem",
        textAnchor: "middle",
        transform: "translateY(0.2rem)",
        fill: "white",
      }}
    >
      {name}
    </text>
  </g>
  );
};

export default NameCircle;
