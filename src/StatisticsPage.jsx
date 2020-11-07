import React, { useState } from "react";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import Grid from "@material-ui/core/Grid";
import LabeledHeatmap from "./Heatmap";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "./Menu";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import SunburstChart from "./SunburstChart";
import { StyledPaper } from "./StyledPaper";
import styled from "styled-components/macro";

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
    background-color: transparent;
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

const StatsPageWrapper = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg");
  height: ${window.innerHeight}px;
  overflow-x: hidden;
  .home-container {
    padding-top: 2rem;
    text-align: center;
    display: inline-block;
    flex-grow: 1;
    padding-left: 4rem;
    height: ${window.innerHeight}px;
  }
  .button-container {
    padding: 2rem;
  }
`;

const StatisticsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedMineral, setSelectedMineral] = useState(false);
  const [limit, setLimit] = useState(8);

  function handleListItemClick(rock) {
    setSelectedMineral(selectedMineral === rock ? false : rock);
  }

  function handleSearchMineralsList(input) {
    const data = require("./data/data.json");
    const resultList = [];
    for (let i = 0; i < Object.keys(data.minerals).length; i++) {
      if (data.minerals[i].name.toLowerCase().includes(input.toLowerCase())) {
        resultList.push(data.minerals[i]);
      }
    }
    return resultList;
  }

  const searchBar = {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    borderRadius: 15,
    height: 40,
  };

  return (
    <StatsPageWrapper>
      <Menu title="Crystallizer" />
      <div className="home-container" maxwidth="lg">
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
                  {selectedMineral ? selectedMineral.name : "Minerals"}
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
                <LabeledHeatmap mineral={selectedMineral} />
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <StyledPaper
                  height={"8rem"}
                  style={{ width: 360, marginBottom: "1rem" }}
                >
                  <MuiThemeProvider>
                    <SearchBar
                      onChange={(value) =>
                        setResults(handleSearchMineralsList(value))
                      }
                      style={searchBar}
                    />
                    <MineralsListWrapper>
                      <List>
                        {results.slice(0, limit).map((rock) => (
                          <ListItem
                            key={rock.name}
                            style={{
                              backgroundColor:
                                rock === selectedMineral &&
                                "rgb(243, 165, 203, 0.6)",
                              color: rock === selectedMineral && "white",
                            }}
                            button
                            onClick={() => handleListItemClick(rock)}
                          >
                            <ListItemText primary={rock.name} />
                          </ListItem>
                        ))}
                        {results.length > 8 && (
                          <div style={{ textAlign: "center" }}>
                            <a
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => setLimit(limit + 8)}
                            >
                              Load more
                            </a>
                          </div>
                        )}
                      </List>
                    </MineralsListWrapper>
                  </MuiThemeProvider>
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
      </div>
    </StatsPageWrapper>
  );
}

export default StatisticsPage;
