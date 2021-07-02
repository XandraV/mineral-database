import React, { useState } from "react";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import Grid from "@material-ui/core/Grid";
import LabeledHeatmap from "./Heatmap";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import SunburstChart from "./SunburstChart";
import { StyledPaper } from "./StyledPaper";
import { Paper, InputBase } from "@material-ui/core";
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
  const [results, setResults] = useState<any>([]);
  const [selectedMineral, setSelectedMineral] = useState<any>(null);
  const [limit, setLimit] = useState(8);

  function handleListItemClick(rock: object) {
    setSelectedMineral(selectedMineral === rock ? false : rock);
  }

  function handleSearchMineralsList(input: string) {
    const data = require("./data/data.json");
    const resultList = [];
    for (let i = 0; i < Object.keys(data.minerals).length; i++) {
      if (data.minerals[i].name.toLowerCase().includes(input.toLowerCase())) {
        resultList.push(data.minerals[i]);
      }
    }
    return resultList;
  }

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quisLorem ipsum dolor sit amet,
                consectetur adipiscing
              </p>
            </Description>
          </Grid>
          <Grid item xs={11} style={{ display: "flex", marginBottom: 80 }}>
            <Description>
              <div>Groups and Subgroups</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quisLorem ipsum dolor sit amet,
                consectetur adipiscing
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quisLorem ipsum dolor sit amet,
                consectetur adipiscing
                
              </p>
            </Description>
            <SunburstChart />
          </Grid>
          <Grid item xs={11} style={{ display: "flex", marginBottom: 80 }}>
          <LabeledHeatmap />
            <Description>
              <div>Most Common Element Pairs</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quisLorem ipsum dolor sit amet,
                consectetur adipiscing
              </p>
            </Description>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default ElementsPage;
