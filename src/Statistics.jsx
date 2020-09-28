import React, { useState } from "react";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import Container from "@material-ui/core/Container";
import ControlledExpansionPanel from "./ControlledExpansionPanel";
import Grid from "@material-ui/core/Grid";
import LabeledHeatmap from "./Heatmap";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import SunburstChart from "./SunburstChart";
import { Menu } from "./Menu";
import { handleSearchMineralsList, getAllMinerals } from "./helpers";
import styled from "styled-components/macro";

const StyledContainer = styled(Container)`
  padding-top: 80px;
  padding-left: 80px;
  padding-bottom: 10px;
  display: grid;
`;

const MineralsListWrapper = styled(Paper)`
  position: relative;
  height: 10rem;
  width: 350px;
  border-radius: 0.8rem;
  padding: 5px;
  flex-direction: column;
  background: "white";
  ul {
    height: 9rem;
    overflow: auto;
  }
  ul > div > div > span.MuiListItemText-primary {
    font-size: 1rem;
  }
`;

function Statistics() {
  const [results, setResults] = useState(getAllMinerals());
  const [selectedMineral, setSelectedMineral] = useState(false);

  function handleListItemClick(rock) {
    setSelectedMineral(selectedMineral === rock ? false : rock);
  }

  const searchBar = {
    marginTop: 5,
    marginBottom: 5,
    width: 350,
    borderRadius: 15,
  };

  return (
    <MuiThemeProvider>
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-vis/dist/style.css"
      />
      <Menu title="Mineral Statistics" />
      <main>
        <StyledContainer maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item>
              <ControlledExpansionPanel
                value={
                  <div>
                    <BubbleChart />
                  </div>
                }
                title={
                  "Number of minerals containing a specific element - Bubble Chart"
                }
              />
              <ControlledExpansionPanel
                value={
                  <div>
                    <LabeledHeatmap mineral={selectedMineral} />
                  </div>
                }
                title={"Occurence of element pairs in minerals - Heat Map"}
              />
              <ControlledExpansionPanel
                value={
                  <div>
                    <SunburstChart />
                  </div>
                }
                title={"Sunburst"}
              />
            </Grid>
            <Grid item>
              <BarChart selectedMineral={selectedMineral} />
              <SearchBar
                onChange={(value) =>
                  setResults(handleSearchMineralsList(value))
                }
                style={searchBar}
              />
              <MineralsListWrapper>
                <List className="minerals">
                  {results != null
                    ? results.map((rock) => (
                        <ListItem
                          key={rock.name}
                          style={{
                            backgroundColor:
                              rock === selectedMineral ? "lightGrey" : "white",
                          }}
                          button
                          onClick={() => handleListItemClick(rock)}
                        >
                          <ListItemText primary={rock.name} />
                        </ListItem>
                      ))
                    : null}
                </List>
              </MineralsListWrapper>
            </Grid>
          </Grid>
        </StyledContainer>
      </main>
    </MuiThemeProvider>
  );
}

export default Statistics;
