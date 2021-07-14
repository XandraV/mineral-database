import React, { useState } from "react";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import Grid from "@material-ui/core/Grid";
import LabeledHeatmap from "./Heatmap";
import SunburstWithDescription from "./SunburstWithDescription";
import molecule from "./images/molecule.svg";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  img.background {
    opacity: 0.12;
    position: absolute;
    top: 150px;
    left: -200px;
  }
`;

const Title = styled.div`
  font-size: 50px;
  margin-bottom: 40px;
  display: flex;
  padding-left: 50px;
  font-weight: 700;
  color: white;
`;

const Description = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: white;
  display: inline-block;
  text-align: left;
  margin: 0 20px;
  p {
    font-size: 19px;
    font-weight: 300;
  }
`;

const ElementsPage = () => {
  const [selectedMineral, setSelectedMineral] = useState<any>(null);

  return (
    <>
      <Wrapper>
        <img
          className="background"
          src={molecule}
          alt={"Atom"}
          width={600}
          height={600}
        />
        <Title>Elements</Title>
        <Grid container justify="center" style={{ display: "inline-flex" }}>
          <Grid item xs={11} style={{ display: "flex", marginBottom: 80 }}>
            <Description>
              <div>Occurence of Elements</div>
              <p>
                There are more than 5000 known minerals, but only about 100 of
                these are common. Silicon and oxygen make up about threequarters
                of the crust by weight, and silicate minerals such as quartz,
                feldspar, and olivine are by far the most common minerals in
                rocks, making up 90 percent of the rocks at Earth’s surface. The
                carbonates calcite and dolomite form sedimentary rocks, such as
                limestone.
              </p>
            </Description>
            {/* Number of Minerals Containing a Specific Element */}
            <BubbleChart />
          </Grid>
          <Grid item xs={10} style={{ display: "flex", marginBottom: 80 }}>
            <BarChart selectedMineral={selectedMineral} />
            <Description>
              <div>How many elements?</div>
              <p>
                Most minerals are chemical compounds composed of two or more
                chemical elements. However, copper, sulfur, gold, silver, and a
                few others occur as single “native” elements. A chemical formula
                identifies the atoms present in a mineral and their proportions.
                After careful analysis it turns out that most minerals contain 3
                or 4 distinct elements.
              </p>
            </Description>
          </Grid>
          <Grid item xs={11} style={{ display: "flex", marginBottom: 80 }}>
            <SunburstWithDescription />
          </Grid>
          <Grid item xs={11} style={{ display: "flex", marginBottom: 80 }}>
            <LabeledHeatmap />
            <Description>
              <div>Most Common Element Pairs</div>
              <p>
                Most minerals are chemical compounds composed of two or more
                chemical elements. Here are the most common element pairs
                occuring together in the same mineral. Silicon, hydrogen,
                calcium and oxygen are by far the most common elements in
                minerals.
              </p>
            </Description>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default ElementsPage;
