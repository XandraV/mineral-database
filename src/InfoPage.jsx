import React, { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import Avatar from "@material-ui/core/Avatar";
import Formula from "./Formula";
import ComponentsCircle from "./ComponentsCircle";
import { MainGroupCircle, SubGroupCircle } from "./GroupCircles";
import { MineralContext } from "./MineralContext";
import GravityCircle from "./GravityCircle";
import { ColorText, HardnessText, SystemText } from "./SmallCircles";

function InfoPage() {
  const { chosenCreatedMineral } = useContext(MineralContext);
  const [myChosenCreatedMineral] = chosenCreatedMineral;
  const light = "hsl(211, 100%, 89%)";

  const [width, setWidth] = useState(window.innerWidth);
  const height = 600;
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth + 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      <Menu title={myChosenCreatedMineral.name}>
        <Formula
          className="formula-html"
          chosenCreatedMineral={myChosenCreatedMineral}
        />
      </Menu>
      {/* mineral, group, system images */}
      <InfoAvatar
        width={9}
        height={9}
        top={height / 2 - 70}
        left={width / 2 - 50}
        keyWord={myChosenCreatedMineral.color[0]}
      />
      <InfoAvatar
        width={8}
        height={8}
        top={height / 2 + 50}
        left={width / 2 - 165}
        keyWord={myChosenCreatedMineral.mainGroup[0]}
      />
      <InfoAvatar
        width={7}
        height={7}
        top={height / 2 + 70}
        left={width / 2 + 90}
        keyWord={myChosenCreatedMineral.system}
      />
      <svg
        widht={width}
        height={height}
        style={{ paddingLeft: 20, overflow: "visible" }}
      >
        {/* components */}
        <ComponentsCircle
          svgWidth={width}
          svgHeight={height}
          mineral={myChosenCreatedMineral}
        />
        {/* main group circle */}
        <MainGroupCircle
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.mainGroup[0]}
        />
        {/* subgroup circle */}
        <SubGroupCircle
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.subGroup[0]}
        />
        {/* maingroup image circle */}
        <circle
          cx={`${width / 2 - 120}`}
          cy={`${height / 2 + 120}`}
          r={70}
          fill={"white"}
          style={{ stroke: light, strokeWidth: 12 }}
        />
        {/* system image circle */}
        <circle
          cx={`${width / 2 + 120}`}
          cy={`${height / 2 + 120}`}
          r={70}
          fill={"white"}
          style={{ stroke: light, strokeWidth: 12 }}
        />
        {/* gravity circle */}
        <GravityCircle
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.specificGravity}
        />
        {/* systems text */}
        <SystemText
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.system}
        />
        {/* hardness text */}
        <HardnessText
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.hardness}
        />
        {/* colour text */}
        <ColorText
          svgWidth={width}
          svgHeight={height}
          label={myChosenCreatedMineral.color[0]}
        />
        {/* mineral image circle  */}
        <circle
          cx={`${width / 2}`}
          cy={`${height / 2}`}
          r={100}
          fill={"white"}
          style={{ stroke: light, strokeWidth: 12 }}
        />
      </svg>
    </div>
  );
}

function InfoAvatar(props) {
  return (
    <Avatar
      alt="avatar"
      src={
        props.keyWord === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          : `https://crystallizer.s3.eu-west-2.amazonaws.com/${props.keyWord.toLowerCase()}.svg`
      }
      style={{
        width: `${props.width}rem`,
        height: `${props.height}rem`,
        top: `${props.top}px`,
        left: `${props.left}px`,
        position: "absolute",
      }}
    />
  );
}

export default InfoPage;

// const systemInfoText =
//   "There are six crystal systems. Although you may have seen more than six shapes of crystals, they’re all variations of one of these six habits. ";
// const groupInfoText =
//   "A mineral group is a set of mineral species with essentially the same crystal structure and composed of chemically similar elements. ";
// const subGroupInfoText =
//   "The next level of mineral classification after categorization in groups.";
// const gravityInfoText =
//   "Specific Gravity is a measurement that determines the density of minerals. It determines how heavy it is by its relative weight to water. ";
