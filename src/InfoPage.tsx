import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MineralContext } from "./MineralContextProvider";
import Crystal3D from "./Crystal3D";
import MainGroup3D from "./MainGroup3D";
import System3D from "./System3D";
import { getDarkColor } from "./helpers";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";
import BackButton from "./BackButton";

const Wrapper = styled.div`
  height: ${window.innerHeight * 0.8}px;
`;

const Title = styled.div`
  font-size: 50px;
  margin-bottom: 40px;
  font-weight: 700;
  display: flex;
  color: white;
`;

const Description = styled.div`
  font-size: 19px;
  text-align: left;
  color: white;
  width: 400px;
`;

const Card = styled.div`
  display: inline-grid;
  margin-right: 20px;
  width: fit-content;
  padding: 10px 20px;
  color: white;
  font-weight: 300;
  font-size: 12px;
  div:first-child,
  div:nth-child(3),
  div:nth-child(5) {
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
  }
`;

const InfoPage = () => {
  const { chosenMineral } = useContext(MineralContext);

  const dark = getDarkColor(chosenMineral.color[0].toLowerCase());

  return (
    <Wrapper>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={7}>
          <BackButton />
          <Title>{chosenMineral.name}</Title>
          <Description>
            {chosenMineral.name} is a silicate mineral. Silicate minerals are
            rock-forming minerals made up of silicate groups. They are the
            largest and most important class of minerals and make up
            approximately 90 percent of Earth's crust.
          </Description>
          <div
            id="crystal-3d"
            style={{
              left: "50%",
              top: 600 / 5,
              position: "absolute",
              transform: "translateX(10%)",
            }}
          >
            <Crystal3D
              width={300}
              height={300}
              shaderName={chosenMineral.color[0].toLowerCase()}
              rotationSpeed={1}
            />
          </div>
        </Grid>

        <Grid item xs={8} style={{ paddingTop: 70}}>
          <Card>
            <div>Chemical Formula</div>
            <div
              dangerouslySetInnerHTML={{
                __html: chosenMineral.formulaWeb,
              }}
            />

            <div>Hardness</div>
            <div>{chosenMineral.hardness}</div>

            <div>Specific Gravity</div>
            <div>{chosenMineral.specificGravity}</div>
          </Card>
          <Card>
            <div>Crystal Structure</div>
            <div>{chosenMineral.system}</div>

            <System3D system={"Hexagonal"} />
          </Card>
          <Card>
            <div>Group</div>
            <div>
              {chosenMineral.mainGroup[0]},{" "}
              {typeof chosenMineral.subGroup === "string"
                ? chosenMineral.subGroup
                : chosenMineral.subGroup[0]}
            </div>

            <MainGroup3D groupName={chosenMineral.mainGroup[0]} />
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default InfoPage;
