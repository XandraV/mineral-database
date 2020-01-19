import React from "react";
import { Stage, Layer, Text, Circle, Line, Rect, Group } from "react-konva";

const darkColor = "#009faf";
const lightColor = "#80deea";
export function SystemCircle(props) {
    return (
      <Layer>
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={120}
          fill={"#80deea"}
        />
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={90}
          fill={"#ffffff"}
        />
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={90}
          fillPatternImage={props.mineralSystemImage}
          fillPatternRepeat={"no-repeat"}
          fillPatternScaleX={1}
          fillPatternScaleY={1}
          fillPatternOffsetY={75}
          fillPatternOffsetX={100}
        />
      </Layer>
    );
  }
export function GroupCircle(props) {
    return (
      <Layer>
        <Circle
          x={70 + window.innerWidth / 2 - 225}
          y={210}
          radius={65}
          fill={lightColor}
        />
        <Text
          fontSize={18}
          text={
            props.choosenCreatedMineral.mainGroup[0] +
            "\ngroup"
          }
          wrap="char"
          x={70 - 65 + window.innerWidth / 2 - 225}
          y={210 - 65}
          fill={"white"}
          width={130}
          height={130}
          align={"center"}
          verticalAlign={"middle"}
        />
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={100}
          fill={"#80deea"}
        />
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={75}
          fill={"#ffffff"}
        />
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={75}
          fillPatternImage={props.mineralGroupImage}
          fillPatternRepeat={"no-repeat"}
          fillPatternScaleX={1}
          fillPatternScaleY={1}
          fillPatternOffsetY={80}
          fillPatternOffsetX={100}
        />
      </Layer>
    );
  }


export function chooseMineralPic(colorOfMineral) {
  switch (colorOfMineral.toLowerCase()) {
    case "yellow":
      return "yellow";
    case "orange":
      return "orange";
    case "black":
      return "black";
    case "blue":
      return "blue";
    case "bluish-green":
      return "bluish-green";
    case "brown":
      return "brown";
    case "cream":
      return "cream";
    case "green":
      return "green";
    case "greenish-blue":
      return "greenish-blue";
    case "grey":
      return "grey";
    case "pale-brown":
      return "pale-brown";
    case "pink":
      return "pink";
    case "purple":
      return "purple";
    case "red-brown":
      return "red-brown";
    case "red":
      return "red";
    case "violet":
      return "violet";
    case "yellow-orange":
      return "yellow-orange";
    case "gray":
      return "grey";
    default:
      return "yellow";
  }
}

export function groupMineralPic(groupOfMineral) {
  switch (groupOfMineral.toLowerCase()) {
    case "sulfides":
      return "sulfides";
    case "silicates":
      return "silicates";
    case "halides" /*F, Cl, Br, I, At elements pics*/:
      return "silicates";
    case "elements" /*first or first two elements pic*/:
      return "silicates";
    case "oxides":
      return "oxides";
    case "carbonates":
      return "carbonates";
    case "nitrates":
      return "nitrates";
    case "borates":
      return "borates";
    case "sulfates":
      return "sulfates";
    case "phosphates":
      return "phosphates";
    case "arsenates":
      return "arsenates";
    case "vanadates":
      return "vanadates";
    case "organic" /*carbon element*/:
      return "silicates";
    default:
      return "silicates";
  }
}