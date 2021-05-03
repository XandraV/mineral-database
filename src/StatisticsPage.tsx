import React, { useState } from "react";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import Grid from "@material-ui/core/Grid";
import LabeledHeatmap from "./Heatmap";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "./Menu";
import SunburstChart from "./SunburstChart";
import { StyledPaper } from "./StyledPaper";
import {Paper, InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  padding-top: 2rem;
  text-align: center;
  display: inline-block;
  margin-left: 6rem;
`;

const MineralsListWrapper = styled.div`
  position: relative;
  height: 5rem;
  width: 300px;
  border-radius: 0.8rem;
  flex-direction: column;
  ul {
    height: 4rem;
    overflow: auto;
  }
  ul > div.MuiListItem-root {
    padding-bottom: 0px;
    padding-top: 0px;
    border-radius: 0.5rem;
    :hover {
      background-color: rgb(243, 165, 203, 0.6);
    }
  }
  ul > div > div > span.MuiListItemText-primary {
    font-size: 0.8rem;
    font-weight: bold;
    font-family: "Literata", serif;
  }
`;

const StatisticsPage = () => {
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
      <Menu />
      <Wrapper>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ display: "inline-flex" }}
        >
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              maxWidth: "100rem",
              display: "inline-flex",
              marginBottom: "1rem",
            }}
          >
            <Grid item xs={12} style={{ marginRight: "1rem" }}>
              <StyledPaper height={"16rem"}>
                <div>Number of Minerals Containing a Specific Element</div>
                <BubbleChart />
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <StyledPaper height={"16rem"}>
                <div>
                  Number of Distinct Elements in{" "}
                  {selectedMineral ? (
                    <span>
                      {selectedMineral.name}:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${selectedMineral.formulaWeb}`,
                        }}
                      />
                    </span>
                  ) : (
                    "Minerals"
                  )}
                </div>
                <BarChart selectedMineral={selectedMineral} />
              </StyledPaper>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            style={{ maxWidth: "100rem", display: "inline-flex" }}
          >
            <Grid item xs={12} style={{ marginRight: "1rem" }}>
              <StyledPaper height={"18.5rem"}>
                <div>Occurence of Element Pairs in Minerals</div>
                <LabeledHeatmap />
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <StyledPaper
                  height={"8rem"}
                  style={{ width: 360, marginBottom: "1rem" }}
                >
                  <MineralsListWrapper>
                    <Paper
                      component="form"
                      style={{
                        alignItems: "center",
                        marginTop: 5,
                        marginBottom: 5,
                        width: 300,
                        borderRadius: 10,
                        height: 40,
                      }}
                    >
                      <InputBase
                        placeholder="Search"
                        inputProps={{ "aria-label": "search" }}
                        onChange={(event) =>
                          setResults(
                            handleSearchMineralsList(event.target.value)
                          )
                        }
                      />
                      <SearchIcon
                        style={{
                          margin: 10,
                          verticalAlign: "middle",
                          color: "lightgrey",
                        }}
                      />
                    </Paper>
                    <List>
                      {results.slice(0, limit).map((rock: { name: string }) => (
                        <ListItem
                          key={rock.name}
                          style={{
                            backgroundColor: `${
                              rock === selectedMineral
                                ? "rgb(243, 165, 203, 0.6)"
                                : "transparent"
                            }`,
                            color: `${
                              rock === selectedMineral ? "white" : "#83769a"
                            }`,
                          }}
                          button
                          onClick={() => handleListItemClick(rock)}
                        >
                          <ListItemText primary={rock.name} />
                        </ListItem>
                      ))}
                      {results.length > 8 && (
                        <div
                          style={{ cursor: "pointer", textAlign: "center" }}
                          onClick={() => setLimit(limit + 8)}
                        >
                          Load more
                        </div>
                      )}
                    </List>
                  </MineralsListWrapper>
                </StyledPaper>
              </Grid>
              <Grid item xs={12}>
                <StyledPaper height={"9.5rem"} style={{ width: 360 }}>
                  <SunburstChart />
                </StyledPaper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default StatisticsPage;
