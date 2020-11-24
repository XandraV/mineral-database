import React, { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import { MainGroupCircle, SubGroupCircle } from "./GroupCircles";
import { MineralContext } from "./MineralContext";
import GravityCircle from "./GravityCircle";
import { ColorText, HardnessText, SystemText } from "./SmallCircles";
import Crystal3D from "./Crystal3D";
import NameCircle from "./NameCircle";
import MainGroup3D from "./MainGroup3D";
import System3D from "./System3D";
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

  function getDarkColor(myColor: string) {
    switch (myColor) {
      case "yellow":
        return "#ffe082";
      case "green":
      case "greenish-blue":
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

  const dark = getDarkColor(mychosenMineral.color[0].toLowerCase());
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
        <MainGroup3D groupName={mychosenMineral.mainGroup[0]} />
        <System3D system={"Hexagonal"} />
        <div
          id="crystal-3d"
          style={{ left: width * 0.34, top: height / 5, position: "absolute" }}
        >
          <Crystal3D
            width={300}
            height={300}
            shaderName={mychosenMineral.color[0].toLowerCase()}
          />
        </div>
        {/* groump chemical component */}
        <div
          dangerouslySetInnerHTML={{
            __html: getGroupMolecule(mychosenMineral.mainGroup[0]),
          }}
          style={{
            color: dark,
            left: width * 0.27,
            top: height / 2,
            position: "absolute",
            fontSize: "1rem",
          }}
        />
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
          <MainGroupCircle
            svgHeight={height}
            label={mychosenMineral.mainGroup[0]}
            colors={[dark, light]}
          />
          <SubGroupCircle
            svgHeight={height}
            label={
              typeof mychosenMineral.subGroup === "string"
                ? mychosenMineral.subGroup
                : mychosenMineral.subGroup[0]
            }
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

function getGroupMolecule(group: string) {
  switch (group) {
    case "Silicates":
      return "<span>SiO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Oxides":
      return "<span>O<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup></span></span>";
    case "Sulfates":
      return "<span>SO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Sulfides":
      return "<span>S<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup></span></span>";
    case "Carbonates":
      return "<span>CO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>3</sub></span></span>";
    case "Halides":
      return "<span>F, Cl</span>";
    case "Phosphates":
      return "<span>PO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>3−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Borates":
      return "<span>BO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Organic":
    default:
      return "<span>C</span>";
  }
}
// const systemInfoText =
//   "There are six crystal systems. Although you may have seen more than six shapes of crystals, they’re all variations of one of these six habits. ";
// const groupInfoText =
//   "A mineral group is a set of mineral species with essentially the same crystal structure and composed of chemically similar elements. ";
// const subGroupInfoText =
//   "The next level of mineral classification after categorization in groups.";
// const gravityInfoText =
//   "Specific Gravity is a measurement that determines the density of minerals. It determines how heavy it is by its relative weight to water. ";
