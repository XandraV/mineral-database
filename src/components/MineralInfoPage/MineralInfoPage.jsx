import React, { useContext, useEffect, useState, useRef } from "react";
import BackButton from "./BackButton";
import { Menu } from "../../Menu";
import { Stage, Layer } from "react-konva";
import Container from "@material-ui/core/Container";
import {
  GroupCircle,
  SystemCircle,
  SystemInfo,
  GroupInfo,
  ComponentsInfo,
  Components,
  SpecificGravityInfo,
  SpecificGravityCircle,
  SmallSystemCircle,
  ComponentsBackground,
  SubGroup,
  SubGroupInfo,
  Hardness,
  Color,
  MineralImage,
} from "./MineralInfoPageComponents";
import Formula from "./Formula";
import styled from "styled-components/macro";
import { MineralContext } from "../../MineralContext";

const MenuWrapper = styled.div`
  .appBar {
    z-index: 1201;
    background-color: #009faf;
  }
  .menu-header-text {
    flex-grow: 1;
  }
`;

const PageWrapper = styled.main`
  padding-top: 70px;
  flex-grow: 1;
  height: 100vh;
`;

function MineralInfoPage() {
  const { chosenCreatedMineral } = useContext(MineralContext);
  const [
    myChosenCreatedMineral,
    setMyChosenCreatedMineral,
  ] = chosenCreatedMineral;

  const [mineralImage, setMineralImage] = useState(null);
  const [mineralGroupImage, setMineralGroupImage] = useState("");
  const [mineralSystemImage, setMineralSystemImage] = useState("");
  const [hoveredGravity, setHoveredGravity] = useState(false);
  const [hoveredSystem, setHoveredSystem] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(false);
  const [hoveredSubGroup, setHoveredSubGroup] = useState(false);
  const [hoveredComponents, setHoveredComponents] = useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);

    getImagesForInfoPage(myChosenCreatedMineral);
    window.addEventListener("getimage", getImagesForInfoPage);
    window.removeEventListener("getimage", getImagesForInfoPage);

    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  function getImagesForInfoPage(chosenMineral) {
    if (chosenMineral != null) {
      const imageMineral = new window.Image();
      const imageGroup = new window.Image();
      const imageSystem = new window.Image();
      const color = myChosenCreatedMineral.color[0].toLowerCase();
      const group = myChosenCreatedMineral.mainGroup[0].toLowerCase();
      const system = myChosenCreatedMineral.system.toLowerCase();
      imageMineral.onload = () => {
        setMineralImage(imageMineral);
      };
      imageGroup.onload = () => {
        setMineralGroupImage(imageGroup);
      };
      imageSystem.onload = () => {
        setMineralSystemImage(imageSystem);
      };
      imageMineral.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${color}.svg`;
      imageGroup.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${group}.svg`;
      imageSystem.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${system}.svg`;
    }
  }

  return (
    <div>
      <Menu title={myChosenCreatedMineral.name}>
      <BackButton />
        <Formula
          className="formula-html"
          chosenCreatedMineral={myChosenCreatedMineral}
        />
      </Menu>
      <PageWrapper>
        <Container
          maxWidth="lg"
          className="container"
          style={{ paddingLeft: 40 }}
        >
          <div>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
              rel="stylesheet"
            />
            <div className="canvas-wrapper">
              <Stage width={width} height={600}>
                <Layer>
                  <ComponentsBackground />
                </Layer>
                <Layer
                  onTap={() => setHoveredComponents(true)}
                  onMouseOver={() => setHoveredComponents(true)}
                >
                  <Components
                    chosenCreatedMineral={myChosenCreatedMineral}
                    mainGroup={myChosenCreatedMineral.mainGroup}
                  />
                </Layer>
                {hoveredComponents ? (
                  <ComponentsInfo
                    chosenCreatedMineral={myChosenCreatedMineral}
                  />
                ) : null}
                <Layer
                  onTap={() => setHoveredGravity(true)}
                  onMouseOver={() => setHoveredGravity(true)}
                >
                  <SpecificGravityCircle
                    specificGravity={myChosenCreatedMineral.specificGravity}
                  />
                </Layer>
                {hoveredGravity ? <SpecificGravityInfo /> : null}
                <SmallSystemCircle system={myChosenCreatedMineral.system} />
                <Layer
                  onTap={() => setHoveredSystem(true)}
                  onMouseOver={() => setHoveredSystem(true)}
                >
                  <SystemCircle
                    mineralSystemImage={mineralSystemImage}
                    chosenCreatedMineral={myChosenCreatedMineral}
                  />
                </Layer>
                {hoveredSystem ? (
                  <SystemInfo hoveredSystem={hoveredSystem} />
                ) : null}
                <Layer
                  onTap={() => setHoveredSubGroup(true)}
                  onMouseOver={() => setHoveredSubGroup(true)}
                >
                  <SubGroup subGroup={myChosenCreatedMineral.subGroup} />
                </Layer>
                {hoveredSubGroup ? <SubGroupInfo /> : null}
                {hoveredGroup ? <GroupInfo /> : null}
                <Layer
                  onTap={() => setHoveredGroup(true)}
                  onMouseOver={() => setHoveredGroup(true)}
                >
                  <GroupCircle
                    mineralGroupImage={mineralGroupImage}
                    chosenCreatedMineral={myChosenCreatedMineral}
                  />
                </Layer>
                <Hardness hardness={myChosenCreatedMineral.hardness} />
                <Color color={myChosenCreatedMineral.color} />
                <MineralImage mineralImage={mineralImage} />
              </Stage>
            </div>
          </div>
        </Container>
      </PageWrapper>
    </div>
  );
}

export default MineralInfoPage;
