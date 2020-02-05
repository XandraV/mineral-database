import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { dataSunburst } from "./sunburstData";
import { Hint, Sunburst } from "react-vis";
import SearchBar from "material-ui-search-bar";
import { handleSearchMineralsList, getAllMinerals, demoAsyncCall } from "../../helpers";
import {
  mineralColors,
  mineralSystems,
  mineralGroups,
  mineralSubGroups
} from "./dashboardData";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import LabeledHeatmap from "./Heatmap";
import BubbleChart from "./BubbleChart";
import BarChart from "./BarChart";
import { Menu } from "../../Menu";
import ControlledExpansionPanel from "./ControlledExpansionPanel";
import SunburstBreadcrumbs from "./SunburstBreadcrumbs";
import SunburstAvatar from "./SunburstAvatar";
import "./../../App.css";
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: getAllMinerals(),
      chosenMineral: null,
      isloading: true,
      selectedColor: [],
      selectedGroup: [],
      selectedSubGroup: [],
      selectedSystem: [],
      hoveredCell: false,
      hoveredParent: false
    };
  }

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ isloading: false }));
  }

  handleListItemClick(rock) {
    this.setState({
      chosenMineral: this.state.chosenMineral === rock ? null : rock
    });
  }

  updateMineralsList() {
    const originalMineralsArray = getAllMinerals();
    const filterColors = this.state.selectedColor;
    const filterGroups = this.state.selectedGroup;
    const filterSubGroups = this.state.selectedSubGroup;
    const filterSystems = this.state.selectedSystem;
    if (filterColors.length > 0) {
      var newMineralsArray = originalMineralsArray.filter(el => {
        return filterColors.some(elem => el.color.includes(elem));
      });
    } else {
      var newMineralsArray = originalMineralsArray;
    }

    if (filterGroups.length > 0) {
      var newMineralsArray2 = newMineralsArray.filter(el => {
        return filterGroups.some(elem => el.mainGroup.includes(elem));
      });
    } else {
      var newMineralsArray2 = newMineralsArray;
    }

    if (filterSubGroups.length > 0) {
      var newMineralsArray3 = newMineralsArray2.filter(el => {
        return filterSubGroups.some(elem => el.subGroup.includes(elem));
      });
    } else {
      var newMineralsArray3 = newMineralsArray2;
    }

    if (filterSystems.length > 0) {
      var newMineralsArray4 = newMineralsArray3.filter(el => {
        return filterSystems.some(elem => el.system.includes(elem));
      });
    } else {
      var newMineralsArray4 = newMineralsArray3;
    }

    this.setState({
      results: newMineralsArray4,
      chosenMineral: null
    });
  }

  handleSelectColor(mycolor) {
    if (this.state.selectedColor.indexOf(mycolor) > -1) {
      var newselected = this.state.selectedColor;
      newselected.splice(this.state.selectedColor.indexOf(mycolor), 1);
      this.setState({
        selectedColor: newselected
      });
    } else {
      var newselected = this.state.selectedColor.concat([mycolor]);
      this.setState({
        selectedColor: newselected
      });
    }
  }

  handleDeleteColor(colorToBeDeleted) {
    const newselected = this.state.selectedColor;
    newselected.splice(this.state.selectedColor.indexOf(colorToBeDeleted), 1);
    this.setState({
      selectedColor: newselected
    });
  }

  handleSelectGroup(mygroup) {
    if (this.state.selectedColor.indexOf(mygroup) > -1) {
      var newselected = this.state.selectedGroup;
      newselected.splice(this.state.selectedGroup.indexOf(mygroup), 1);
      this.setState({
        selectedGroup: newselected
      });
    } else {
      var newselected = this.state.selectedGroup.concat([mygroup]);
      this.setState({
        selectedGroup: newselected
      });
    }
  }

  handleDeleteGroup(groupToBeDeleted) {
    const newselected = this.state.selectedGroup;
    newselected.splice(this.state.selectedGroup.indexOf(groupToBeDeleted), 1);
    this.setState({
      selectedGroup: newselected
    });
  }

  handleSelectSubGroup(mySubGroup) {
    if (this.state.selectedColor.indexOf(mySubGroup) > -1) {
      var newselected = this.state.selectedSubGroup;
      newselected.splice(this.state.selectedSubGroup.indexOf(mySubGroup), 1);
      this.setState({
        selectedSubGroup: newselected
      });
    } else {
      var newselected = this.state.selectedSubGroup.concat([mySubGroup]);
      this.setState({
        selectedSubGroup: newselected
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
      selectedSubGroup: newselected
    });
  }

  handleSelectSystem(systemGroup) {
    if (this.state.selectedSystem.indexOf(systemGroup) > -1) {
      var newselected = this.state.selectedSystem;
      newselected.splice(this.state.selectedSystem.indexOf(systemGroup), 1);
      this.setState({
        selectedSystem: newselected
      });
    } else {
      var newselected = this.state.selectedSystem.concat([systemGroup]);
      this.setState({
        selectedSystem: newselected
      });
    }
  }

  handleDeleteSystem(systemToBeDeleted) {
    const newselected = this.state.selectedSystem;
    newselected.splice(this.state.selectedSystem.indexOf(systemToBeDeleted), 1);
    this.setState({
      selectedSystem: newselected
    });
  }

  resetFilters(){
    this.setState({
      results: getAllMinerals(),
      chosenMineral: null,
      selectedColor: [],
      selectedGroup: [],
      selectedSubGroup: [],
      selectedSystem: []
    })
  }

  render() {
    const searchBar = {
      marginTop: 5,
      marginBottom: 5,
      width: 350,
      borderRadius: 15
    };

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <link
              rel="stylesheet"
              href="https://unpkg.com/react-vis/dist/style.css"
            />
            <Menu title="Mineral Statistics" />
            <main
              className="main-stats"
              style={{
                height: "100%",
                width: document.documentElement.clientWidth,
                backgroundSize: "cover"
              }}
            >
              <Container maxWidth="lg" className="stats-page-container">
                <Grid container spacing={2}>
                  <Grid item>
                    <ControlledExpansionPanel
                      width={750}
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
                      width={750}
                      value={
                        <div>
                          <LabeledHeatmap mineral={this.state.chosenMineral} />
                        </div>
                      }
                      title={"Occurence of element pairs in minerals - HeatMap"}
                    />
                    <ControlledExpansionPanel
                      width={750}
                      value={
                        <div>
                          <Grid container spacing={2}>
                            <Grid item>
                              <Sunburst
                                hideRootNode
                                colorType="literal"
                                data={dataSunburst}
                                height={400}
                                width={450}
                                style={{
                                  stroke: "#fff",
                                  text: { color: "#ffffff" }
                                }}
                                onValueMouseOver={v =>
                                  this.setState({
                                    hoveredCell: v.x && v.y ? v : false,
                                    hoveredParent: v.parent.data
                                  })
                                }
                                margin={{
                                  top: 50,
                                  bottom: 50,
                                  left: 50,
                                  right: 50
                                }}
                              >
                                <div className="sunburst-image-wrapper">
                                  {this.state.hoveredCell ? (
                                    <SunburstAvatar
                                      hoveredCell={this.state.hoveredCell}
                                    />
                                  ) : null}
                                </div>
                                {this.state.hoveredCell ? (
                                  <Hint
                                    value={{
                                      x: this.state.hoveredCell.x,
                                      y: this.state.hoveredCell.y
                                    }}
                                  >
                                    <div className="sunburst-hint-container-outter">
                                      <div className="sunburst-hint-container-inner" />
                                      {this.state.hoveredCell.title}
                                    </div>
                                  </Hint>
                                ) : null}
                              </Sunburst>
                            </Grid>
                            <Grid item>
                              <div>
                                <div className="breadcrumbs">Current group</div>
                                {this.state.hoveredCell ? (
                                  <SunburstBreadcrumbs
                                    hoveredCell={this.state.hoveredCell}
                                    hoveredParent={this.state.hoveredParent}
                                  />
                                ) : null}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      }
                      title={"Sunburst"}
                    />
                  </Grid>
                  <Grid item>
                    <Paper className="barchart-container">
                      <Typography className="barchart-title" noWrap>
                        Number of distinct elements in minerals
                      </Typography>
                      <BarChart point={this.state.chosenMineral} />
                      <Typography className="barchart-legend" noWrap>
                        {this.state.chosenMineral != null
                          ? `${this.state.chosenMineral.name} contains ${this.state.chosenMineral.formula.length} distinct elements`
                          : "# of elements"}
                      </Typography>
                    </Paper>
                    <SearchBar
                      onChange={value =>
                        this.setState({ results: handleSearchMineralsList(value) })
                      }
                      style={searchBar}
                    />
                    <Paper className="minerals-list">
                      {this.state.loading ? (
                        <CircularProgress
                          style={{ marginLeft: "45%", marginTop: "15%" }}
                          size={40}
                        />
                      ) : (
                        <List style={{ height: 130, overflow: "auto" }}>
                          {this.state.results != null
                            ? this.state.results.map(rock => (
                                <ListItem
                                  style={{
                                    backgroundColor:
                                      rock === this.state.chosenMineral
                                        ? "lightGrey"
                                        : "white"
                                  }}
                                  button
                                  onClick={() => this.handleListItemClick(rock)}
                                >
                                  <ListItemText
                                    primary={rock.name}
                                  />
                                </ListItem>
                              ))
                            : null}
                        </List>
                      )}
                    </Paper>
                    <ControlledExpansionPanel
                      width={340}
                      value={
                        <div>
                          <div style={{ height: 230, overflow: "auto", overflowX:"hidden"}}>
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
                                  {mineralColors.map(color => (
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
                                selectedColorElement => (
                                  <Chip
                                    label={selectedColorElement}
                                    style={{
                                      margin: 7,
                                      color: "white",
                                      backgroundColor: "lightpink"
                                    }}
                                    onDelete={() =>
                                      this.handleDeleteColor(
                                        selectedColorElement
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
                                  Group
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "lol2"]}
                                  className="properties-select"
                                >
                                  {mineralGroups.map(grp => (
                                    <MenuItem value="">
                                      <ListItemText
                                        primary={grp}
                                        onClick={() =>
                                          this.handleSelectGroup(grp)
                                        }
                                      />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {this.state.selectedGroup.map(
                                selectedGroupElement => (
                                  <Chip
                                    label={selectedGroupElement}
                                    style={{
                                      margin: 7,
                                      color: "white",
                                      backgroundColor: "lightBlue"
                                    }}
                                    onDelete={() =>
                                      this.handleDeleteGroup(
                                        selectedGroupElement
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
                                  SubGroup
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "lol2"]}
                                  className="properties-select"
                                >
                                  {mineralSubGroups.map(sgrp => (
                                    <MenuItem value="">
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
                                selectedSubGroupElement => (
                                  <Chip
                                    label={selectedSubGroupElement}
                                    style={{
                                      margin: 7,
                                      color: "white",
                                      backgroundColor: "lightBlue"
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
                                  {mineralSystems.map(sys => (
                                    <MenuItem value="">
                                      <ListItemText
                                        primary={sys}
                                        onClick={() =>
                                          this.handleSelectSystem(sys)
                                        }
                                      />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {this.state.selectedSystem.map(
                                selectedSystemElement => (
                                  <Chip
                                    label={selectedSystemElement}
                                    style={{
                                      margin: 7,
                                      color: "white",
                                      backgroundColor: "lightBlue"
                                    }}
                                    onDelete={() =>
                                      this.handleDeleteSystem(
                                        selectedSystemElement
                                      )
                                    }
                                    clickable
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <div className="apply-reset-btn-container">
                            <Button
                              className="apply-reset"
                              variant="contained"
                              onClick={() => this.updateMineralsList()}
                            >
                              Apply
                            </Button>
                            <Button
                              className="apply-reset"
                              variant="contained"
                              onClick={() =>
                                this.resetFilters()
                              }
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      }
                      title={"Advanced search"}
                    />
                  </Grid>
                </Grid>
              </Container>
            </main>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Statistics;
