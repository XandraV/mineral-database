import React from "react";
import { Layer, Text, Circle, Line, Rect, Group } from "react-konva";

const darkColor = "#009faf";
const lightColor = "#80deea";
const data = require("./mineralGroups.json");
export function getGroupData(choosenCreatedMineral, mineralGroup) {
  if (mineralGroup != null) {
    if (mineralGroup === "Elements") {
      return choosenCreatedMineral.formula[0];
    } else {
      console.log(mineralGroup);
      return data.groups.elements[mineralGroup];
    }
  }
}
export function MineralImage(props) {
  return (
    <Layer>
      <Circle
        x={250 + window.innerWidth / 2 - 225}
        y={180}
        radius={110}
        fill={lightColor}
      />
      <Circle
        x={250 + window.innerWidth / 2 - 225}
        y={180}
        radius={100}
        fill={"#ffffff"}
      />
      <Circle
        x={250 + window.innerWidth / 2 - 225}
        y={180}
        radius={100}
        fillPatternImage={props.mineralImage}
        fillPatternRepeat={"no-repeat"}
        fillPatternScaleX={1}
        fillPatternScaleY={1}
        fillPatternOffsetY={80}
        fillPatternOffsetX={100}
      />
    </Layer>
  );
}

export function Color(props) {
  return (
    <Layer>
      <Line
        className="color"
        points={[
          250 + window.innerWidth / 2 - 225,
          180,
          250 + window.innerWidth / 2 - 225,
          40
        ]}
        stroke={lightColor}
        strokeWidth={5}
      />
      <Circle
        className="smallColor"
        x={250 + window.innerWidth / 2 - 225}
        y={40}
        radius={10}
        fill={lightColor}
      />
      <Circle
        className="smallColor"
        x={250 + window.innerWidth / 2 - 225}
        y={40}
        radius={5}
        fill={darkColor}
      />
      <Text
        fontSize={15}
        text={props.color[0]}
        wrap="char"
        x={250 + window.innerWidth / 2 - 225 - 55}
        y={10}
        fill={"black"}
        width={100}
        height={15}
        align={"center"}
        verticalAlign={"middle"}
      />
    </Layer>
  );
}

export function Hardness(props) {
  return (
    <Layer>
      <Line
        className="hardness"
        points={[
          250 + window.innerWidth / 2 - 225,
          190,
          250 + 140 + window.innerWidth / 2 - 225,
          190
        ]}
        stroke={lightColor}
        strokeWidth={5}
      />
      <Circle
        className="smallHardness"
        x={250 + 140 + window.innerWidth / 2 - 225}
        y={190}
        radius={10}
        fill={lightColor}
      />
      <Circle
        className="smallHardness"
        x={250 + 140 + window.innerWidth / 2 - 225}
        y={190}
        radius={5}
        fill={darkColor}
      />
      <Text
        fontSize={15}
        text={"Hardness\n" + props.hardness}
        wrap="char"
        x={250 + 140 + window.innerWidth / 2 - 225 + 10}
        y={180}
        fill={"black"}
        width={110}
        height={40}
        align={"center"}
        verticalAlign={"middle"}
      />
    </Layer>
  );
}

export function SubGroup(props) {
  return (
    <Group>
      <Circle
        x={180 + window.innerWidth / 2 - 225}
        y={470}
        radius={80}
        fill={lightColor}
      />
      <Circle
        x={180 + window.innerWidth / 2 - 225}
        y={470}
        radius={70}
        fill={darkColor}
      />
      <Text
        fontSize={18}
        text={props.subGroup[0] + "\nsubgroup"}
        wrap="char"
        x={180 - 70 + window.innerWidth / 2 - 225}
        y={480 - 70}
        fill={"white"}
        width={140}
        height={140}
        align={"center"}
        verticalAlign={"middle"}
      />
    </Group>
  );
}
export function ComponentsBackground() {
  return (
    <Group>
      <Circle
        className="groupElements"
        x={125 + window.innerWidth / 2 - 240}
        y={90}
        radius={75}
        fill={lightColor}
        /*shadowColor={'grey'}
      shadowBlur={10}*/
      />
      <Circle
        className="groupElements"
        x={125 + window.innerWidth / 2 - 240}
        y={90}
        radius={60}
        fill={darkColor}
      />
    </Group>
  );
}

export function SmallSystemCircle(props) {
  return (
    <Layer>
      <Line
        className="system"
        points={[
          380 + window.innerWidth / 2 - 225,
          340,
          380 + window.innerWidth / 2 - 225,
          340 + 150
        ]}
        stroke={lightColor}
        strokeWidth={6}
      />
      <Circle
        className="smallSystem"
        x={380 + window.innerWidth / 2 - 225}
        y={340 + 150}
        radius={10}
        fill={lightColor}
      />
      <Circle
        className="smallSystem"
        x={380 + window.innerWidth / 2 - 225}
        y={340 + 150}
        radius={5}
        fill={darkColor}
      />
      <Text
        fontSize={15}
        text={props.system + "\ncrystal structure"}
        wrap="char"
        x={380 + window.innerWidth / 2 - 225 - 75}
        y={340 + 150 + 15}
        fill={"black"}
        width={150}
        height={40}
        align={"center"}
        verticalAlign={"middle"}
      />
    </Layer>
  );
}

export function SpecificGravityCircle(props) {
  return (
    <Group>
      <Circle
        x={380 + window.innerWidth / 2 - 215}
        y={90}
        radius={80}
        fill={lightColor}
      />
      <Text
        fontSize={18}
        text={`Specific Gravity\n${props.specificGravity}`}
        wrap="char"
        x={380 - 80 + window.innerWidth / 2 - 215}
        y={90 - 80}
        fill={"white"}
        width={160}
        height={160}
        align={"center"}
        verticalAlign={"middle"}
      />
    </Group>
  );
}

export function Components(props) {
  const componentsList = getGroupData(
    props.choosenCreatedMineral,
    props.mainGroup[0]
  );
  if (componentsList.length > 1) {
    return (
      <Group>
        <Rect
          x={125 - 60 + window.innerWidth / 2 - 225}
          y={90 - 15}
          width={40}
          height={40}
          fill={darkColor}
          stroke={"white"}
          dash={[0.2, 0.4]}
          cornerRadius={3}
        />
        <Rect
          x={125 - 60 + window.innerWidth / 2 - 175}
          y={90 - 15}
          width={40}
          height={40}
          fill={darkColor}
          stroke={"white"}
          dash={[0.2, 0.4]}
          cornerRadius={3}
        />
        <Text
          fontSize={18}
          text={
            getGroupData(props.choosenCreatedMineral, props.mainGroup[0])[0]
          }
          wrap="char"
          x={125 - 60 + window.innerWidth / 2 - 265}
          y={90 - 52}
          fill={"white"}
          width={120}
          height={120}
          align={"center"}
          verticalAlign={"middle"}
        />
        <Text
          fontSize={18}
          text={
            getGroupData(props.choosenCreatedMineral, props.mainGroup[0])[1]
          }
          wrap="char"
          x={125 - 60 + window.innerWidth / 2 - 215}
          y={90 - 52}
          fill={"white"}
          width={120}
          height={120}
          align={"center"}
          verticalAlign={"middle"}
        />
        <Text
          fontSize={15}
          text={"Components"}
          wrap="char"
          x={125 - 60 + window.innerWidth / 2 - 240}
          y={90 - 87}
          fill={"white"}
          width={120}
          height={120}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    );
  } else {
    return (
      <Group>
        <Rect
          x={125 - 60 + window.innerWidth / 2 - 200}
          y={90 - 10}
          width={40}
          height={40}
          fill={darkColor}
          stroke={"white"}
          dash={[0.2, 0.4]}
          cornerRadius={3}
        />
        <Text
          fontSize={18}
          text={
            getGroupData(props.choosenCreatedMineral, props.mainGroup[0])[0]
          }
          wrap="char"
          x={125 - 60 + window.innerWidth / 2 - 240}
          y={90 - 47}
          fill={"white"}
          width={120}
          height={120}
          align={"center"}
          verticalAlign={"middle"}
        />
        <Text
          fontSize={15}
          text={"Components"}
          wrap="char"
          x={125 - 60 + window.innerWidth / 2 - 240}
          y={90 - 87}
          fill={"white"}
          width={120}
          height={120}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    );
  }
}
export function ComponentsInfo(props) {
  return (
    <Layer>
      <Group>
        <Line
          className="groupComponentsInfo"
          points={[
            125 + window.innerWidth / 2 - 300,
            70,
            125 + window.innerWidth / 2 - 480,
            70
          ]}
          stroke={lightColor}
          strokeWidth={5}
        />
        <Circle
          className="groupComponentsInfo"
          x={125 + window.innerWidth / 2 - 240}
          y={90}
          radius={75}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Rect
          className="groupComponentsInfo"
          x={125 + window.innerWidth / 2 - 480}
          y={40}
          width={140}
          height={65}
          fill={"white"}
          stroke={lightColor}
          cornerRadius={6}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Text
          className="groupComponentsInfo"
          fontSize={15}
          fontStyle={{ color: "grey" }}
          text={`Members of the ${
            props.choosenCreatedMineral.mainGroup[0]
          } consist ${data.groups.elements[props.choosenCreatedMineral.mainGroup[0]].length
            
          } elements.`}
          wrap="word"
          x={125 + window.innerWidth / 2 - 480}
          y={50}
          width={190}
          height={50}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    </Layer>
  );
}

export function SystemCircle(props) {
  return (
    <Group>
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
    </Group>
  );
}
export function GroupCircle(props) {
  return (
    <Group>
      <Circle
        x={70 + window.innerWidth / 2 - 225}
        y={210}
        radius={65}
        fill={lightColor}
      />
      <Text
        fontSize={18}
        text={props.choosenCreatedMineral.mainGroup[0] + "\ngroup"}
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
    </Group>
  );
}

export function SystemInfo() {
  return (
    <Layer>
      <Group>
        <Line
          className="systemInfo"
          points={[
            380 + window.innerWidth / 2 - 110,
            350,
            380 + window.innerWidth / 2 - 80,
            350
          ]}
          stroke={lightColor}
          strokeWidth={5}
        />
        <Circle
          className="systemInfo"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={120}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Rect
          className="systemInfo"
          x={380 + window.innerWidth / 2 - 80}
          y={290}
          width={110}
          height={150}
          fill={"white"}
          stroke={lightColor}
          cornerRadius={6}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Text
          className="systemInfo"
          fontSize={15}
          fontStyle={{ color: "grey" }}
          text={
            "There are six crystal systems. Although you may have seen more than six shapes of crystals, they’re all variations of one of these six habits. "
          }
          wrap="word"
          x={380 + window.innerWidth / 2 - 75}
          y={300}
          width={130}
          height={130}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    </Layer>
  );
}

export function GroupInfo() {
  return (
    <Layer>
      <Group>
        <Circle
          className="groupInfo"
          x={70 + window.innerWidth / 2 - 225}
          y={210}
          radius={65}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Line
          className="groupInfo"
          points={[
            130 + window.innerWidth / 2 - 320,
            350,
            130 + window.innerWidth / 2 - 350,
            350
          ]}
          stroke={lightColor}
          strokeWidth={5}
        />
        <Circle
          className="groupInfo"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={100}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Rect
          className="groupInfo"
          x={130 + window.innerWidth / 2 - 470}
          y={300}
          width={120}
          height={150}
          fill={"white"}
          stroke={lightColor}
          cornerRadius={6}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Text
          className="groupInfo"
          fontSize={15}
          fontStyle={{ color: "grey" }}
          text={
            "A mineral group is a set of mineral species with essentially the same crystal structure and composed of chemically similar elements. "
          }
          wrap="word"
          x={130 + window.innerWidth / 2 - 460}
          y={310}
          width={140}
          height={125}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    </Layer>
  );
}
export function SubGroupInfo() {
  return (
    <Layer>
      <Group>
        <Line
          className="subGroupInfo"
          points={[
            180 + window.innerWidth / 2 - 300,
            500,
            180 + window.innerWidth / 2 - 350,
            500
          ]}
          stroke={lightColor}
          strokeWidth={5}
        />
        <Circle
          className="subGroupInfo"
          x={180 + window.innerWidth / 2 - 225}
          y={470}
          radius={80}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Rect
          className="subGroupInfo"
          x={180 + window.innerWidth / 2 - 480}
          y={470}
          width={150}
          height={80}
          fill={"white"}
          stroke={lightColor}
          cornerRadius={6}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Text
          className="subGroupInfo"
          fontSize={15}
          fontStyle={{ color: "grey" }}
          text={
            "The next level of mineral classification after categorization in groups."
          }
          wrap="word"
          x={180 + window.innerWidth / 2 - 480}
          y={470}
          width={200}
          height={70}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    </Layer>
  );
}
export function SpecificGravityInfo() {
  return (
    <Layer>
      <Group>
        <Line
          className="gravityInfo"
          points={[
            380 + window.innerWidth / 2 - 150,
            90,
            380 + window.innerWidth / 2 - 100,
            90
          ]}
          stroke={lightColor}
          strokeWidth={5}
        />
        <Circle
          x={380 + window.innerWidth / 2 - 215}
          y={90}
          radius={80}
          fill={"transparent"}
          stroke={"#00ffff"}
          strokeWidth={2}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Rect
          className="gravityInfo"
          x={380 + window.innerWidth / 2 - 100}
          y={10}
          width={120}
          height={150}
          fill={"white"}
          stroke={lightColor}
          cornerRadius={6}
          shadowColor={"#00ffff"}
          shadowBlur={10}
        />
        <Text
          className="gravityInfo"
          fontSize={15}
          fontStyle={{ color: "grey" }}
          text={
            "Specific Gravity is a measurement that determines the density of minerals. It determines how heavy it is by its relative weight to water. "
          }
          wrap="word"
          x={380 + window.innerWidth / 2 - 90}
          y={25}
          width={130}
          height={125}
          align={"center"}
          verticalAlign={"middle"}
        />
      </Group>
    </Layer>
  );
}