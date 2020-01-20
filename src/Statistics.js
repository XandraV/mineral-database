import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FormHelperText from "@material-ui/core/FormHelperText";
import { dataSunburst } from "./sunburstData";
import { Hint, Sunburst } from "react-vis";
import SearchBar from "material-ui-search-bar";
import { handleSearch, getAllMinerals, demoAsyncCall } from "./helpers";
import {
  mineralColors,
  mineralSystems,
  mineralGroups,
  mineralSubGroups
} from "./dashboardData";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import LabeledHeatmap from "./Heatmap";
import BubbleChart from "./BubbleChart";
import BarChart from "./BarChart";
import { Menu } from "./MenuComponents";
import { chooseMineralPic, groupMineralPic } from "./MineralInfoPageComponents";
class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: getAllMinerals(),
      choosenMineral: null,
      loading: true,
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
    demoAsyncCall().then(() => this.setState({ loading: false, loaded: true }));
  }

  handleListItemClick(rock) {
    this.setState({
      choosenMineral: this.state.choosenMineral === rock ? null : rock
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
      choosenMineral: null
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

  renderBreadcrumbs() {
    const chipCellStyle = {
      backgroundColor: this.state.hoveredCell.color,
      color: "white",
      fontWeight: "bold"
    };
    const chipParentCellStyle = {
      backgroundColor: this.state.hoveredParent.color,
      color: "white",
      fontWeight: "bold"
    };
    return (
      <div>
        <Paper elevation={0}>
          {this.state.hoveredCell.category === "Group" ? (
            <Chip label={this.state.hoveredCell.title} style={chipCellStyle} />
          ) : (
            <Breadcrumbs
              separator="›"
              aria-label="Breadcrumb"
              style={{ fontSize: 15, color: "black" }}
            >
              <Chip
                label={this.state.hoveredParent.title}
                style={chipParentCellStyle}
              />
              <Chip
                label={this.state.hoveredCell.title}
                style={chipCellStyle}
              />
            </Breadcrumbs>
          )}
        </Paper>
        <Divider
          variant="middle"
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            marginRight: 0
          }}
        />
        <div className="groupInfoSunburst">
          <Typography style={{ fontSize: 12 }}>
            Silicate mineral, any of a large group of silicon-oxygen compounds
            that are widely distributed throughout much of the solar system. The
            basic structural unit of all silicate minerals is the silicon
            tetrahedron in which one silicon atom is surrounded by and bonded to
            (i.e., coordinated with) four oxygen atoms, each at the corner of a
            regular tetrahedron. These SiO4 tetrahedral units can share oxygen
            atoms and be linked in a variety of ways, which results in different
            structures.
          </Typography>
        </div>
      </div>
    );
  }

  render() {
    const applyResetstyle = {
      marginLeft: 10,
      background: "#009faf",
      borderRadius: 25,
      border: 0,
      color: "white",
      height: 40,
      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
      transition: "all 0.3s ease 0s",
      fontWeight: "bold"
    };

    const barChartContainer = {
      height: 280,
      width: 350,
      borderRadius: 15,
      paddingTop: 20,
      paddingRight: 20,
      paddingLeft: 30,
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      background: "white",
      textAlign: "center"
    };
    const searchList = {
      position: "relative",
      height: 140,
      width: 350,
      borderRadius: 15,
      padding: 5,
      flexDirection: "column",
      background: "white"
    };
    const searchBar = {
      marginTop: 5,
      marginBottom: 5,
      width: 350,
      borderRadius: 15
    };
    const filterText = { fontSize: 11, fontStyle: "italic" };
    const selectStyle = { height: 3, width: 80 };
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
              <Container
                maxWidth="lg"
                style={{
                  paddingTop: 80,
                  paddingLeft: 40,
                  paddingBottom: 10,
                  display: "grid"
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ControlledExpansionPanels
                      width={800}
                      value={
                        <div>
                          <BubbleChart />
                        </div>
                      }
                      title={
                        "Number of minerals containing a specific element - Bubble Chart"
                      }
                    />
                    <ControlledExpansionPanels
                      width={800}
                      value={
                        <div>
                          <LabeledHeatmap mineral={this.state.choosenMineral} />
                        </div>
                      }
                      title={"Occurence of element pairs in minerals - HeatMap"}
                    />
                    <ControlledExpansionPanels
                      width={800}
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
                                /*getLabel={d =>
                                d.category === "Group" ? d.title : null
                              }
                              labelS*/
                              >
                                <div className="sunburstMiddleText">
                                  {this.state.hoveredCell ? (
                                    <Avatar
                                      alt="Something"
                                      src={require("./images/" +
                                        groupMineralPic(
                                          this.state.hoveredCell.title
                                        ).toString() +
                                        ".svg")}
                                      style={{ width: 200, height: 200 }}
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
                                    <div className="hintTextContainer1">
                                      <div className="hintTextContainer2" />
                                      {this.state.hoveredCell.title}
                                    </div>
                                  </Hint>
                                ) : null}
                              </Sunburst>
                            </Grid>
                            <Grid item>
                              <div>
                                <div className="breadcrumbs">Current group</div>
                                {this.state.hoveredCell
                                  ? this.renderBreadcrumbs()
                                  : null}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      }
                      title={"Sunburst"}
                    />
                  </Grid>
                  <Grid item>
                    <Paper style={barChartContainer}>
                      <Typography
                        style={{
                          fontSize: 15,
                          color: "#b5b0b0",
                          paddingBottom: 10,
                          fontWeight: "bold",
                          alignSelf: "center"
                        }}
                        noWrap
                      >
                        Number of distinct elements in minerals
                      </Typography>
                      {/* Number of elements minerals contain on average */}
                      <BarChart point={this.state.choosenMineral} />
                      <Typography
                        style={{
                          fontSize: 12,
                          color: "#b5b0b0",
                          fontWeight: "bold"
                        }}
                        noWrap
                      >
                        {this.state.choosenMineral != null
                          ? `${this.state.choosenMineral.name} contains ${this.state.choosenMineral.formula.length} distinct elements`
                          : "# of elements"}
                      </Typography>
                    </Paper>
                    <SearchBar
                      onChange={value =>
                        this.setState({ results: handleSearch(value) })
                      }
                      style={searchBar}
                    />
                    <Paper style={searchList}>
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
                                      rock === this.state.choosenMineral
                                        ? "lightGrey"
                                        : "white"
                                  }}
                                  button
                                  onClick={() => this.handleListItemClick(rock)}
                                >
                                  <ListItemText
                                    primary={rock.name}
                                    style={{ fontSize: 12 }}
                                  />
                                </ListItem>
                              ))
                            : null}
                        </List>
                      )}
                    </Paper>
                    <ControlledExpansionPanels
                      width={340}
                      value={
                        <div>
                          <div style={{ height: 230, overflow: "auto" }}>
                            <div className="filterField">
                              <FormControl style={{ padding: 10 }}>
                                <FormHelperText style={filterText}>
                                  Color
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "bla"]}
                                  style={selectStyle}
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
                                      backgroundColor: selectedColorElement
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
                            <div className="filterField">
                              <FormControl style={{ padding: 10 }}>
                                <FormHelperText style={filterText}>
                                  Group
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "lol2"]}
                                  style={selectStyle}
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
                                      color: "black"
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
                            <div className="filterField">
                              <FormControl style={{ padding: 10 }}>
                                <FormHelperText style={filterText}>
                                  SubGroup
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "lol2"]}
                                  style={selectStyle}
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
                                      color: "black"
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
                            <div className="filterField">
                              <FormControl style={{ padding: 10 }}>
                                <FormHelperText style={filterText}>
                                  System
                                </FormHelperText>
                                <Select
                                  multiple
                                  value={["lol", "lol2"]}
                                  style={selectStyle}
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
                                      color: "black"
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
                          <div className="applyResetButtonContainer">
                            <Button
                              style={applyResetstyle}
                              variant="contained"
                              className="button-create"
                              onClick={() => this.updateMineralsList()}
                            >
                              Apply
                            </Button>
                            <Button
                              style={applyResetstyle}
                              variant="contained"
                              className="button-create"
                              onClick={() =>
                                this.setState({
                                  results: getAllMinerals(),
                                  choosenMineral: null,
                                  loading: true,
                                  selectedColor: [],
                                  selectedGroup: [],
                                  selectedSubGroup: [],
                                  selectedSystem: []
                                })
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

function ControlledExpansionPanels(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        style={{ width: props.width, borderRadius: 15, margin: 5 }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 10 }}>
          {props.value}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default StatsPage;
