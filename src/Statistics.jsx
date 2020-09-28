import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  handleSearchMineralsList,
  getAllMinerals,
  demoAsyncCall,
} from "./helpers";
import {
  mineralColors,
  mineralSystems,
  mineralGroups,
  mineralSubGroups,
} from "./data/dashboardData";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import CircularProgress from "@material-ui/core/CircularProgress";
import ControlledExpansionPanel from "./ControlledExpansionPanel";
import LabeledHeatmap from "./Heatmap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import StyledButton from "./StyledButton";
import { Menu } from "./Menu";
import "./App.css";
import styled from "styled-components/macro";
import SunburstChart from "./SunburstChart";

const ButtonsWrapper = styled.span`
  padding-left: 1em;
  text-align: right;
  padding-top: 10px;
  margin-right: 0.5em;
`;

const StyledContainer = styled(Container)`
  padding-top: 80px;
  padding-left: 80px;
  padding-bottom: 10px;
  display: grid;
`;
const MineralsListWrapper = styled(Paper)`
  position: relative;
  height: 140px;
  width: 350px;
  border-radius: 15px;
  padding: 5px;
  flex-direction: column;
  background: "white";

  ul {
    height: 8rem;
    overflow: auto;
  }
  ul > div > div > span.MuiListItemText-primary {
    font-size: 1rem;
  }
`;

class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      results: getAllMinerals(),
      selectedMineral: false,
      selectedColor: [],
      selectedGroup: [],
      selectedSubGroup: [],
      selectedSystem: [],
      hoveredCell: false,
      hoveredParent: false,
    };
  }

  handleListItemClick(rock) {
    this.setState({
      selectedMineral: this.state.selectedMineral === rock ? false : rock,
    });
  }

  updateMineralsList() {
    let newMineralsArray;
    let newMineralsArray2;
    let newMineralsArray3;
    let newMineralsArray4;
    const originalMineralsArray = getAllMinerals();
    const filterColors = this.state.selectedColor;
    const filterGroups = this.state.selectedGroup;
    const filterSubGroups = this.state.selectedSubGroup;
    const filterSystems = this.state.selectedSystem;
    if (filterColors.length > 0) {
      newMineralsArray = originalMineralsArray.filter((el) => {
        return filterColors.some((elem) => el.color.includes(elem));
      });
    } else {
      newMineralsArray = originalMineralsArray;
    }

    if (filterGroups.length > 0) {
      newMineralsArray2 = newMineralsArray.filter((el) => {
        return filterGroups.some((elem) => el.mainGroup.includes(elem));
      });
    } else {
      newMineralsArray2 = newMineralsArray;
    }

    if (filterSubGroups.length > 0) {
      newMineralsArray3 = newMineralsArray2.filter((el) => {
        return filterSubGroups.some((elem) => el.subGroup.includes(elem));
      });
    } else {
      newMineralsArray3 = newMineralsArray2;
    }

    if (filterSystems.length > 0) {
      newMineralsArray4 = newMineralsArray3.filter((el) => {
        return filterSystems.some((elem) => el.system.includes(elem));
      });
    } else {
      newMineralsArray4 = newMineralsArray3;
    }

    this.setState({
      results: newMineralsArray4,
      selectedMineral: null,
    });
  }

  handleSelectColor(mycolor) {
    let newselected;
    if (this.state.selectedColor.indexOf(mycolor) > -1) {
      newselected = this.state.selectedColor;
      newselected.splice(this.state.selectedColor.indexOf(mycolor), 1);
      this.setState({
        selectedColor: newselected,
      });
    } else {
      newselected = this.state.selectedColor.concat([mycolor]);
      this.setState({
        selectedColor: newselected,
      });
    }
  }

  handleDeleteColor(colorToBeDeleted) {
    const newselected = this.state.selectedColor;
    newselected.splice(this.state.selectedColor.indexOf(colorToBeDeleted), 1);
    this.setState({
      selectedColor: newselected,
    });
  }

  handleSelectGroup(mygroup) {
    let newselected;
    if (this.state.selectedColor.indexOf(mygroup) > -1) {
      newselected = this.state.selectedGroup;
      newselected.splice(this.state.selectedGroup.indexOf(mygroup), 1);
      this.setState({
        selectedGroup: newselected,
      });
    } else {
      newselected = this.state.selectedGroup.concat([mygroup]);
      this.setState({
        selectedGroup: newselected,
      });
    }
  }

  handleDeleteGroup(groupToBeDeleted) {
    const newselected = this.state.selectedGroup;
    newselected.splice(this.state.selectedGroup.indexOf(groupToBeDeleted), 1);
    this.setState({
      selectedGroup: newselected,
    });
  }

  handleSelectSubGroup(mySubGroup) {
    if (this.state.selectedColor.indexOf(mySubGroup) > -1) {
      var newselected = this.state.selectedSubGroup;
      newselected.splice(this.state.selectedSubGroup.indexOf(mySubGroup), 1);
      this.setState({
        selectedSubGroup: newselected,
      });
    } else {
      var newselected = this.state.selectedSubGroup.concat([mySubGroup]);
      this.setState({
        selectedSubGroup: newselected,
      });
    }
  }

  handleDeleteSubGroup(subGroupToBeDeleted) {
    const newselected = this.state.selectedSubGroup;
    newselected.splice(
      this.state.selectedSubGroup.indexOf(subGroupToBeDeleted),
      1
    );
    this.setState({
      selectedSubGroup: newselected,
    });
  }

  handleSelectSystem(systemGroup) {
    if (this.state.selectedSystem.indexOf(systemGroup) > -1) {
      var newselected = this.state.selectedSystem;
      newselected.splice(this.state.selectedSystem.indexOf(systemGroup), 1);
      this.setState({
        selectedSystem: newselected,
      });
    } else {
      var newselected = this.state.selectedSystem.concat([systemGroup]);
      this.setState({
        selectedSystem: newselected,
      });
    }
  }

  handleDeleteSystem(systemToBeDeleted) {
    const newselected = this.state.selectedSystem;
    newselected.splice(this.state.selectedSystem.indexOf(systemToBeDeleted), 1);
    this.setState({
      selectedSystem: newselected,
    });
  }

  resetFilters() {
    this.setState({
      results: getAllMinerals(),
      selectedMineral: null,
      selectedColor: [],
      selectedGroup: [],
      selectedSubGroup: [],
      selectedSystem: [],
    });
  }

  render() {
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
                      <LabeledHeatmap mineral={this.state.selectedMineral} />
                    </div>
                  }
                  title={"Occurence of element pairs in minerals - HeatMap"}
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
                <BarChart selectedMineral={this.state.selectedMineral} />
                <SearchBar
                  onChange={(value) =>
                    this.setState({
                      results: handleSearchMineralsList(value),
                    })
                  }
                  style={searchBar}
                />
                <MineralsListWrapper>
                  <List>
                    {this.state.results != null
                      ? this.state.results.map((rock) => (
                          <ListItem
                            key={rock.name}
                            style={{
                              backgroundColor:
                                rock === this.state.selectedMineral
                                  ? "lightGrey"
                                  : "white",
                            }}
                            button
                            onClick={() => this.handleListItemClick(rock)}
                          >
                            <ListItemText primary={rock.name} />
                          </ListItem>
                        ))
                      : null}
                  </List>
                </MineralsListWrapper>
                <ControlledExpansionPanel
                  width={340}
                  value={
                    <div>
                      <div
                        style={{
                          height: 230,
                          overflow: "auto",
                          overflowX: "hidden",
                        }}
                      >
                        <div className="filter-field">
                          <FormControl style={{ padding: 10 }}>
                            <FormHelperText className="filter-properties">
                              Color
                            </FormHelperText>
                            <Select
                              multiple
                              value={["", ""]}
                              className="properties-select"
                            >
                              {mineralColors.map((color) => (
                                <MenuItem key={color} value={color}>
                                  <ListItemText
                                    primary={color}
                                    onClick={() =>
                                      this.handleSelectColor(color)
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {this.state.selectedColor.map(
                            (selectedColorElement) => (
                              <Chip
                                label={selectedColorElement}
                                style={{
                                  margin: 7,
                                  color: "white",
                                  backgroundColor: "lightpink",
                                }}
                                onDelete={() =>
                                  this.handleDeleteColor(selectedColorElement)
                                }
                                clickable
                              />
                            )
                          )}
                        </div>
                        <div className="filter-field">
                          <FormControl style={{ padding: 10 }}>
                            <FormHelperText className="filter-properties">
                              Group
                            </FormHelperText>
                            <Select
                              multiple
                              value={["lol", "lol2"]}
                              className="properties-select"
                            >
                              {mineralGroups.map((group) => (
                                <MenuItem key={group} value="">
                                  <ListItemText
                                    primary={group}
                                    onClick={() =>
                                      this.handleSelectGroup(group)
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {this.state.selectedGroup.map(
                            (selectedGroupElement) => (
                              <Chip
                                label={selectedGroupElement}
                                style={{
                                  margin: 7,
                                  color: "white",
                                  backgroundColor: "lightBlue",
                                }}
                                onDelete={() =>
                                  this.handleDeleteGroup(selectedGroupElement)
                                }
                                clickable
                              />
                            )
                          )}
                        </div>
                        <div className="filter-field">
                          <FormControl style={{ padding: 10 }}>
                            <FormHelperText className="filter-properties">
                              SubGroup
                            </FormHelperText>
                            <Select
                              multiple
                              value={["lol", "lol2"]}
                              className="properties-select"
                            >
                              {mineralSubGroups.map((sgrp) => (
                                <MenuItem key={sgrp} value="">
                                  <ListItemText
                                    primary={sgrp}
                                    onClick={() =>
                                      this.handleSelectSubGroup(sgrp)
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {this.state.selectedSubGroup.map(
                            (selectedSubGroupElement) => (
                              <Chip
                                label={selectedSubGroupElement}
                                style={{
                                  margin: 7,
                                  color: "white",
                                  backgroundColor: "lightBlue",
                                }}
                                onDelete={() =>
                                  this.handleDeleteSubGroup(
                                    selectedSubGroupElement
                                  )
                                }
                                clickable
                              />
                            )
                          )}
                        </div>
                        <div className="filter-field">
                          <FormControl style={{ padding: 10 }}>
                            <FormHelperText className="filter-properties">
                              System
                            </FormHelperText>
                            <Select
                              multiple
                              value={["lol", "lol2"]}
                              className="properties-select"
                            >
                              {mineralSystems.map((sys) => (
                                <MenuItem key={sys} value="">
                                  <ListItemText
                                    primary={sys}
                                    onClick={() => this.handleSelectSystem(sys)}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {this.state.selectedSystem.map(
                            (selectedSystemElement) => (
                              <Chip
                                label={selectedSystemElement}
                                style={{
                                  margin: 7,
                                  color: "white",
                                  backgroundColor: "lightBlue",
                                }}
                                onDelete={() =>
                                  this.handleDeleteSystem(selectedSystemElement)
                                }
                                clickable
                              />
                            )
                          )}
                        </div>
                      </div>
                      <ButtonsWrapper>
                        <StyledButton onClick={() => this.updateMineralsList()}>
                          Apply
                        </StyledButton>
                      </ButtonsWrapper>
                      <StyledButton onClick={() => this.resetFilters()}>
                        Reset
                      </StyledButton>
                    </div>
                  }
                  title={"Advanced search"}
                />
              </Grid>
            </Grid>
          </StyledContainer>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default Statistics;
