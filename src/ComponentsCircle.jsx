import React from "react";

const ComponentsCircle = (props) => {
  const dark = props.colors[0];
  const light = props.colors[1];

  const components = props.mineral.mainGroup ?
    props.mineral.mainGroup === "Elements"
      ? [props.mineral.formula[0]]
      : groupElements[props.mineral.mainGroup[0]] : [];
  return (
    <g
      transform={`translate(${- 130},${
        props.svgHeight / 2 - 100
      })`}
    >
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
          transform: "translateY(-0.9rem)",
          fill: "white",
        }}
      >
        Components
      </text>
      {components.length === 1 ? (
        <g>
          <rect
            x={-17}
            y={-5}
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
              fontSize: "0.9rem",
              textAnchor: "middle",
              transform: "translateY(1rem)",
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
            y={-5}
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
            y={-5}
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
              fontSize: "0.9rem",
              transform: "translate(0.6rem, 1rem)",
              fill: "white",
            }}
          >
            {components[1]}
          </text>
          <text
            style={{
              fontSize: "0.9rem",
              transform: "translate(-1.8rem, 1rem)",
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
