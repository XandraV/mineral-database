import React from "react";

const ComponentsCircle = (props) => {
  const dark = "hsl(210, 99%, 69%)";
  const light = "hsl(211, 100%, 89%)";

  const components = props.mineral.mainGroup ?
    props.mineral.mainGroup === "Elements"
      ? [props.mineral.formula[0]]
      : groupElements[props.mineral.mainGroup[0]] : [];
  return (
    <g
      transform={`translate(${props.svgWidth / 2 - 130},${
        props.svgHeight / 2 - 100
      })`}
    >
      <circle
        cx={0}
        cy={0}
        r={70}
        fill={dark}
        style={{ stroke: light, strokeWidth: 17 }}
      />
      <text
        style={{
          fontSize: "0.9rem",
          textAnchor: "middle",
          transform: "translateY(-1rem)",
          fill: "white",
        }}
      >
        Components
      </text>
      {components.length === 1 ? (
        <g>
          <rect
            x={-17}
            y={0}
            height={35}
            width={35}
            rx={5}
            fill={"none"}
            stroke={"white"}
            strokeDasharray={"2,2"}
            style={{ stroke: "white" }}
          ></rect>
          <text
            style={{
              fontSize: "1rem",
              textAnchor: "middle",
              transform: "translateY(1.5rem)",
              fill: "white",
            }}
          >
            {components[0]}
          </text>
        </g>
      ) : (
        <g>
          <rect
            x={-36}
            y={0}
            rx={5}
            height={30}
            width={30}
            fill={"none"}
            stroke={"white"}
            strokeDasharray={"2,2"}
            style={{ stroke: "white" }}
          ></rect>
          <rect
            x={0}
            y={0}
            rx={5}
            height={30}
            width={30}
            fill={"none"}
            stroke={"white"}
            strokeDasharray={"2,2"}
            style={{ stroke: "white" }}
          ></rect>
          <text
            style={{
              fontSize: "1rem",
              transform: "translate(0.5rem, 1.2rem)",
              fill: "white",
            }}
          >
            {components[1]}
          </text>
          <text
            style={{
              fontSize: "1rem",
              transform: "translate(-1.7rem, 1.2rem)",
              fill: "white",
            }}
          >
            {components[0]}
          </text>
        </g>
      )}
    </g>
  );
};

const groupElements = {
  Silicates: ["Si", "O"],
  Oxides: ["O"],
  Sulfates: ["S", "O"],
  Sulfides: ["S"],
  Carbonates: ["C", "O"],
  Halides: ["F", "Cl"],
  Phosphates: ["P", "O"],
  Borates: ["B"],
  Organic: ["C"],
};

export default ComponentsCircle;
