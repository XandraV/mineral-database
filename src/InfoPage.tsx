import React, { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import ComponentsCircle from "./ComponentsCircle";
import { MainGroupCircle, SubGroupCircle } from "./GroupCircles";
import { MineralContext } from "./MineralContext";
import GravityCircle from "./GravityCircle";
import InfoAvatar from "./InfoAvatar";
import { ColorText, HardnessText, SystemText } from "./SmallCircles";
import Crystal3D from "./Crystal3D";
import NameCircle from "./NameCircle";
import styled from "styled-components/macro";

const HomeWrapper = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg");
  height: ${window.innerHeight}px;
`;

const InfoPage = () => {
  const { chosenMineral } = useContext(MineralContext);
  const mychosenMineral: any = chosenMineral[0];

  function colorMap(myColor: string) {
    switch (myColor) {
      case "yellow":
        return "#ffe082";
      case "green":
        return "#c5e1a5";
      case "red":
        return "#ef5350";
      case "blue":
        return "#81d4fa";
      case "black":
      case "grey":
        return "#9fa8da";
      case "Colourless":
      case "white":
        return "#c9c2d4";
      case "pink":
        return "#f48fb1";
      case "violet":
      case "purple":
        return "#ce93d8";
      case "brown":
        return "#bcaaa4";
      case "orange":
        return "#ffab91";
      default:
        return "#80deea";
    }
  }

  const dark = colorMap(mychosenMineral.color[0].toLowerCase());
  const light = "#fafafa";

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
    <HomeWrapper>
      <Menu />
      <div style={{ textAlign: "center" }}>
        <InfoAvatar
          width={10}
          height={10}
          top={height / 2 + 40}
          left={width / 3 - 80}
          keyWord={mychosenMineral.mainGroup[0]}
        />
        <InfoAvatar
          width={9}
          height={9}
          top={height / 2 + 60}
          left={width / 3 + 240}
          keyWord={mychosenMineral.system}
        />
        <div
          id="crystal-3d"
          style={{ left: width*0.34, top: height / 5, position: "absolute" }}
        >
          <Crystal3D
            width={300}
            height={300}
            shaderName={mychosenMineral.color[0].toLowerCase()}
          />
        </div>
        <svg
          width={width}
          height={height}
          viewBox="0 100 100 450"
          style={{ paddingLeft: 20, overflow: "visible" }}
        >
          <NameCircle
            svgHeight={height}
            colors={[dark, light]}
            name={mychosenMineral.name}
          />
          <ComponentsCircle
            svgHeight={height}
            mineral={mychosenMineral}
            colors={[dark, light]}
          />
          <MainGroupCircle
            svgHeight={height}
            label={mychosenMineral.mainGroup[0]}
            colors={[dark, light]}
          />
          <SubGroupCircle
            svgHeight={height}
            label={mychosenMineral.subGroup[0]}
            colors={[dark, light]}
          />
          {/* maingroup image circle */}
          <circle
            cx={`${-120}`}
            cy={`${height / 2 + 120}`}
            r={70}
            fill={"white"}
            style={{ stroke: light, strokeWidth: 12 }}
          />
          {/* system image circle */}
          <circle
            cx={`${120}`}
            cy={`${height / 2 + 120}`}
            r={70}
            fill={"white"}
            style={{ stroke: light, strokeWidth: 12 }}
          />
          <GravityCircle
            svgHeight={height}
            label={mychosenMineral.specificGravity}
            colors={[dark, light]}
          />
          <SystemText
            svgHeight={height}
            label={mychosenMineral.system}
            colors={[dark, light]}
          />
          <HardnessText
            svgHeight={height}
            label={mychosenMineral.hardness}
            colors={[dark, light]}
          />
          <ColorText
            svgHeight={height}
            label={mychosenMineral.color[0]}
            colors={[dark, light]}
          />
          {/* mineral image circle  */}
          <circle
            cx={`${0}`}
            cy={`${height / 2}`}
            r={100}
            fill={"white"}
            style={{ stroke: light, strokeWidth: 12 }}
          />
        </svg>
      </div>
    </HomeWrapper>
  );
};

export default InfoPage;

// const systemInfoText =
//   "There are six crystal systems. Although you may have seen more than six shapes of crystals, they’re all variations of one of these six habits. ";
// const groupInfoText =
//   "A mineral group is a set of mineral species with essentially the same crystal structure and composed of chemically similar elements. ";
// const subGroupInfoText =
//   "The next level of mineral classification after categorization in groups.";
// const gravityInfoText =
//   "Specific Gravity is a measurement that determines the density of minerals. It determines how heavy it is by its relative weight to water. ";
