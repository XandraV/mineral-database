import React, { useContext, useEffect } from "react";
import Menu from "./Menu";
import { MainGroupCircle, SubGroupCircle } from "./GroupCircles";
import { MineralContext } from "./MineralContext";
import GravityCircle from "./GravityCircle";
import { ColorText, HardnessText, SystemText } from "./SmallCircles";
import Crystal3D from "./Crystal3D";
import NameCircle from "./NameCircle";
import MainGroup3D from "./MainGroup3D";
import System3D from "./System3D";
import { getDarkColor, getGroupMolecule } from "./helpers";
import { PageWrapper } from "./PageWrapper";
const light = "#fafafa";
const height = 600;
const width = 1000;

const InfoPage = () => {
  const { chosenMineral } = useContext(MineralContext);
  const mychosenMineral: any = chosenMineral[0];

  const dark = getDarkColor(mychosenMineral.color[0].toLowerCase());

  useEffect(() => {});

  return (
    <PageWrapper>
      <Menu />
      <div style={{ textAlign: "center", width: "100vw" }}>
        <div
          style={{
            top: 600 / 2 + 50,
            left: "50%",
            position: "absolute",
            transform: "translateX(-180%)",
          }}
        >
          <MainGroup3D groupName={mychosenMineral.mainGroup[0]} />
        </div>

        <div
          style={{
            top: 600 / 2 + 70,
            left: "51.5%",
            position: "absolute",
            transform: "translateX(0%)",
          }}
        >
          <System3D system={"Hexagonal"} />
        </div>

        <div
          id="crystal-3d"
          style={{
            left: "50%",
            top: height / 5,
            position: "absolute",
            transform: "translateX(-70%)",
          }}
        >
          <Crystal3D
            width={300}
            height={300}
            shaderName={mychosenMineral.color[0].toLowerCase()}
            rotationSpeed={1}
          />
        </div>
        {/* groump chemical component */}
        <div
          dangerouslySetInnerHTML={{
            __html: getGroupMolecule(mychosenMineral.mainGroup[0]),
          }}
          style={{
            width: width,
            color: dark,
            left: "50%",
            top: height / 2,
            position: "absolute",
            fontSize: "1rem",
            transform: "translateX(-78%)",
          }}
        />
        <svg
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
            fill={"rgb(226,214,246)"}
            style={{ stroke: light, strokeWidth: 12 }}
          />
          {/* system image circle */}
          <circle
            cx={`${120}`}
            cy={`${height / 2 + 120}`}
            r={70}
            fill={"rgb(226,214,246)"}
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
    </PageWrapper>
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
