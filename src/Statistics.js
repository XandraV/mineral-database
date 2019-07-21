import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { mainListItems } from "./listItems";
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
import { bubbleData } from "./bubbledata";
import { heatmapData } from "./heatmapdata";
import { dataSunburst } from "./sunburstData"
import { scaleLinear } from "d3-scale";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  Hint,
  VerticalBarSeries,
  GradientDefs,
  MarkSeriesCanvas,
  VerticalGridLines,
  MarkSeries,
  Sunburst
} from "react-vis";
import SearchBar from "material-ui-search-bar";
import { handleSearch, getAllMinerals } from "./SearchPage";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as THREE from "three";

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
      hoveredCell: false
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

    /*console.log(newMineralsArray4);*/
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

    const filterText = { fontSize: 15, fontStyle: "italic" };

    const tipStyle = {
      display: 'flex',
      color: '#fff',
      background: '#000',
      alignItems: 'center',
      padding: '5px'
    };
    const boxStyle = {height: '10px', width: '10px'};
    
    function buildValue(hoveredCell) {
      const {radius, angle, angle0} = hoveredCell;
      const truedAngle = (angle + angle0) / 2;
      return {
        x: radius * Math.cos(truedAngle),
        y: radius * Math.sin(truedAngle)
      };
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <link
              rel="stylesheet"
              href="https://unpkg.com/react-vis/dist/style.css"
            />
            <AppBar
              position="fixed"
              className="appBar"
              style={{ zIndex: 1201, backgroundColor: "#009faf" }}
            >
              <Toolbar className="toolbar">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className="menu-header-text"
                >
                  {"Mineral Statistics"}
                </Typography>
                <div className="icon">
                  <img
                    alt="icon"
                    src="/crystallizer/favicon.ico"
                    width={50}
                    height={50}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className="drawerPaper">
              <List style={{ marginTop: "61px" }}>{mainListItems}</List>
            </Drawer>
            <main
              style={{
                /*backgroundImage: `url(${backPic})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",*/
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
                  {/* Number of elements minerals contain on average */}
                  <Grid item>
                    <Paper
                      style={{
                        height: 350,
                        width: 450,
                        borderRadius: 15,
                        paddingTop: 20,
                        paddingRight: 20,
                        paddingLeft: 30,
                        display: "flex",
                        overflow: "auto",
                        flexDirection: "column",
                        background: "white",
                        textAlign: "center"
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 15,
                          color: "#b5b0b0",
                          paddingBottom: 30,
                          fontWeight: "bold",
                          alignSelf: "center"
                        }}
                        noWrap
                      >
                        Number of distinct elements in minerals
                      </Typography>
                      <MyBarChart point={this.state.choosenMineral} />
                      <Typography
                        style={{
                          fontSize: 12,
                          color: "#b5b0b0",
                          fontWeight: "bold"
                        }}
                        noWrap
                      >
                        {this.state.choosenMineral != null
                          ? `${this.state.choosenMineral.name} contains ${
                          this.state.choosenMineral.formula.length
                          } distinct elements`
                          : "# of elements"}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <SearchBar
                      onChange={value =>
                        this.setState({ results: handleSearch(value) })
                      }
                      style={{
                        margin: "0 auto",
                        width: 250,
                        borderRadius: 15,
                        marginBottom: 16
                      }}
                    />
                    <Paper
                      style={{
                        position: "relative",
                        height: 285,
                        width: 250,
                        borderRadius: 15,
                        padding: 5,
                        flexDirection: "column",
                        background: "white"
                      }}
                    >
                      {this.state.loading ? (
                        <CircularProgress
                          style={{ marginLeft: "40%", marginTop: "40%" }}
                          size={40}
                        />
                      ) : (
                          <List style={{ height: 270, overflow: "auto" }}>
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
                                  <ListItemText primary={rock.name} />
                                </ListItem>
                              ))
                              : null}
                          </List>
                        )}
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper
                      style={{
                        position: "relative",
                        borderRadius: 15,
                        paddingRight: 15,
                        paddingLeft: 15,
                        paddingTop: 15,
                        flexDirection: "column",
                        background: "white",
                        width: 450,
                        height: 350
                      }}
                    >
                      <div style={{ height: 280, overflow: "auto" }}>
                        <div className="filterField">
                          <FormControl style={{ padding: 10 }}>
                            <FormHelperText style={filterText}>
                              Color
                            </FormHelperText>
                            <Select
                              multiple
                              value={["lol", "bla"]}
                              style={{
                                maxHeight: 48 * 4.5 + 8,
                                width: 100
                              }}
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
                                  margin: 10,
                                  color: "white",
                                  backgroundColor: selectedColorElement
                                }}
                                onDelete={() =>
                                  this.handleDeleteColor(selectedColorElement)
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
                              style={{
                                maxHeight: 48 * 4.5 + 8,
                                width: 100
                              }}
                            >
                              {mineralGroups.map(grp => (
                                <MenuItem value="">
                                  <ListItemText
                                    primary={grp}
                                    onClick={() => this.handleSelectGroup(grp)}
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
                                  margin: 10,
                                  color: "black"
                                }}
                                onDelete={() =>
                                  this.handleDeleteGroup(selectedGroupElement)
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
                              style={{
                                maxHeight: 48 * 4.5 + 8,
                                width: 100
                              }}
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
                                  margin: 10,
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
                              style={{
                                maxHeight: 48 * 4.5 + 8,
                                width: 100
                              }}
                            >
                              {mineralSystems.map(sys => (
                                <MenuItem value="">
                                  <ListItemText
                                    primary={sys}
                                    onClick={() => this.handleSelectSystem(sys)}
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
                                  margin: 10,
                                  color: "black"
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
                      <div
                        style={{
                          textAlign: "right",
                          paddingRight: 10,
                          paddingTop: 5
                        }}
                      >
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
                    </Paper>
                  </Grid>
                  <Grid item>
                    <ControlledExpansionPanels
                      value={
                        <div>
                          <BubbleChart />
                        </div>
                      }
                      title={
                        "Number of minerals containing a specific element - Bubble Chart"
                      }
                    />
                  </Grid>
                  <Grid item>
                    <ControlledExpansionPanels
                      value={
                        <div>
                          <LabeledHeatmap mineral={this.state.choosenMineral} />
                        </div>
                      }
                      title={"Occurence of element pairs in minerals - HeatMap"}
                    />
                  </Grid>
                  <Grid item>
                    <ControlledExpansionPanels
                      value={
                        <div>
                          <Sunburst
                            hideRootNode
                            colorType="literal"
                            data={dataSunburst}
                            height={600}
                            width={650} 
                            style={{stroke: '#fff', text:{color:"#ffffff"}}}
                            onValueMouseOver={v =>
                              this.setState({hoveredCell: v.x && v.y ? v : false})
                            }
                            onValueMouseOut={v => this.setState({hoveredCell: false})}
                            margin={{top: 50, bottom: 50, left: 50, right: 50}}
                            getLabel={d => d.title}
                            labelS                      
                          >
                            {this.state.hoveredCell ? (
                              <Hint value={buildValue(this.state.hoveredCell)}>
                              <div style={tipStyle}>
                                <div style={{...boxStyle, background: this.state.hoveredCell.color}} />
                                  {this.state.hoveredCell.title}
                                </div>
                              </Hint>
                            ) : null}
                          </Sunburst>
                        </div>
                      }
                      title={"Sunburst"}
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
const barData = [
  { x: "1", y: 33 },
  { x: "2", y: 385 },
  { x: "3", y: 675 },
  { x: "4", y: 1089 },
  { x: "5", y: 1090 },
  { x: "6", y: 569 },
  { x: "7", y: 292 },
  { x: "8", y: 157 },
  { x: "9", y: 64 },
  { x: "10", y: 36 },
  { x: "11", y: 8 },
  { x: "12", y: 4 }
];

export class MyBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }
  render() {
    const BarSeries = VerticalBarSeries;
    /*conditional gradient dependint on wether we have a point or not */
    const gradient =
      this.props.point == null ? (
        <GradientDefs>
          <linearGradient
            id="myGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="200"
            y2="200"
          >
            <stop offset="10%" stopColor="orange" />
            <stop offset="50%" stopColor="pink" />
            <stop offset="90%" stopColor="lightBlue" />
          </linearGradient>
        </GradientDefs>
      ) : (
          <GradientDefs>
            <linearGradient
              id="myGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="200"
              y2="200"
            >
              <stop offset="100%" stopColor="lightGrey" />
            </linearGradient>
          </GradientDefs>
        );
    return (
      <div>
        <XYPlot
          xType="ordinal"
          width={400}
          height={250}
          xDistance={100}
          color={"url(#myGradient)"}
        >
          {gradient}
          <XAxis />
          <YAxis />
          <BarSeries
            className="vertical-bar-series-example"
            data={barData}
            onValueMouseOver={v => this.setState({ value: v })}
            onSeriesMouseOut={v => this.setState({ value: false })}
          />
          {this.props.point != null ? (
            <MarkSeries
              animation={true}
              colorType="literal"
              data={[
                { x: this.props.point.formula.length, y: 1, color: "violet" }
              ]}
            />
          ) : null}
          {this.state.value ? (
            <Hint value={this.state.value}>
              <HintContentBar value={this.state.value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

export function HintContentBar({ value }) {
  const { x, y } = value;
  return (
    <div>
      <Paper
        style={{
          backgroundColor: "rgb(105,105,105)",
          alignItems: "center",
          borderRadius: 4,
          padding: 8,
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        }}
      >
        <div style={{ fontSize: "12px", color: "white" }}>{`${y}${
          y > 1 ? " minerals" : " mineral"
          } contain ${x}${x > 1 ? " different elements" : " element"}`}</div>
      </Paper>
      ,
 </div>
  );
}

export class LabeledHeatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  render() {
    const heatMapLabelsX = [
      "H",
      "B",
      "C",
      "N",
      "O",
      "F",
      "P",
      "S",
      "K",
      "Y",
      "I",
      "Li",
      "Be",
      "Na",
      "Mg",
      "Al",
      "Si",
      "Cl",
      "Ca",
      "Ti",
      "V",
      "Cr",
      "Mn",
      "Fe",
      "Co",
      "Ni",
      "Cu",
      "Zn",
      "As",
      "Se",
      "Zr",
      "Mo",
      "Ag",
      "Te",
      "Au",
      "Hg",
      "Pb"
    ];

    const heatMapLabelsY = heatMapLabelsX;
    const data = heatMapLabelsX.reduce((acc, letter1, idx) => {
      return acc.concat(
        heatMapLabelsY.map((letter2, jdx) => ({
          x: `${letter2}1`,
          y: `${letter1}2`,
          cellValue: heatmapData.find(
            el => el.x === `${letter1}1` && el.y === `${letter2}2`
          ).cellValue,
          color: heatmapData.find(
            el => el.x === `${letter1}1` && el.y === `${letter2}2`
          ).cellValue
        }))
      );
    }, []);

    const { min, max } = data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row.color),
        max: Math.max(acc.max, row.color)
      }),
      { min: Infinity, max: -Infinity }
    );
    const { value } = this.state;
    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(["lightBlue", "pink", "orange"]);

    if (this.props.mineral != null) {
      const results3 = [];
      const myarray2 = this.props.mineral.formula;
      for (var i = 0; i < myarray2.length - 1; i++) {
        for (var j = i + 1; j < myarray2.length; j++) {
          results3.push(
            [
              myarray2[i].replace(/,/g, ""),
              myarray2[j].replace(/,/g, "")
            ]
          );
        }
      }

      const indecesArray = [];
      for (const item of results3) {
        indecesArray.push(
          data.reduce(
            (arr, ob, i) => (
              ((ob.x.split(/(\d+)/)[0] === item[0] &&
                ob.y.split(/(\d+)/)[0] === item[1]) ||
                (ob.y.split(/(\d+)/)[0] === item[0] &&
                  ob.x.split(/(\d+)/)[0] === item[1])) &&
              arr.push(i),
              arr
            ),
            []
          )
        );
      }
      const finalIndecesArray = indecesArray.filter(Boolean).flat();

      data.forEach(function (element) {
        if (
          finalIndecesArray.includes(data.indexOf(element)) &&
          element.color !== 0
        ) {
          element.color = 1500;
          element.color = 1500;
        } else {
          element.color = 0;
          element.cellValue = "";
        }
      });
    }
    return (
      <XYPlot
        xType="ordinal"
        xDomain={heatMapLabelsX.map(letter => `${letter}1`)}
        yType="ordinal"
        yDomain={heatMapLabelsY.map(letter => `${letter}2`).reverse()}
        margin={40}
        width={1150}
        height={1200}
      >
        <XAxis
          orientation="top"
          tickFormat={t => {
            return `${t.split(/(\d+)/)[0]}`;
          }}
        />
        <YAxis
          tickFormat={t => {
            return `${t.split(/(\d+)/)[0]}`;
          }}
        />
        <HeatmapSeries
          colorType="literal"
          getColor={d => exampleColorScale(d.color)}
          style={{
            stroke: "white",
            strokeWidth: "2px",
            rectStyle: {
              rx: 10,
              ry: 10
            }
          }}
          className="heatmap-series-example"
          data={data}
          onValueMouseOver={v => this.setState({ value: v })}
          onSeriesMouseOut={v => this.setState({ value: false })}
        />
        <LabelSeries
          style={{ pointerEvents: "none" }}
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => `${d.cellValue}`}
        />
        {value ? (
          <Hint value={value}>
            <HintContentHeatMap value={value} />
          </Hint>
        ) : null}
      </XYPlot>
    );
  }
}

export function HintContentHeatMap({ value }) {
  const { x, y, color } = value;
  if (color !== 0) {
    return (
      <div>
        {hintRowHeatMap({
          numberOfMinerals: color,
          components: `${x.split(/(\d+)/)[0]} and ${y.split(/(\d+)/)[0]}`
        })}
        ,
 </div>
    );
  } else {
    return null;
  }
}

function hintRowHeatMap({ numberOfMinerals, components }) {
  return (
    <Paper
      style={{
        backgroundColor: "rgb(105,105,105)",
        alignItems: "center",
        borderRadius: 4,
        padding: 8,
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
      }}
    >
      <div style={{ fontSize: "12px", color: "white" }}>
        {numberOfMinerals}
        {numberOfMinerals > 1 ? " minerals" : " mineral"}
        {" contain"}
      </div>
      <div style={{ fontSize: "12px", color: "white" }}>{components}</div>
    </Paper>
  );
}

const labelsBubble = [
  "H",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "K",
  "Ca",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "As",
  "Se",
  "Zr",
  "Nb",
  "Mo",
  "Ru",
  "Rh",
  "Ag",
  "Sn",
  "Sb",
  "Te",
  "Ba",
  "Ce",
  "Au",
  "Hg",
  "Pb",
  "U"
];
export class BubbleChart extends React.Component {
  state = {
    data: bubbleData,
    value: false
  };

  render() {
    const { data } = this.state;
    const markSeriesProps = {
      animation: true,
      sizeRange: [1, 35],
      colorRange: ["orange", "pink", "lightBlue"],
      data,
      onNearestXY: value => this.setState({ value })
    };

    return (
      <div style={{ padding: 20 }}>
        <XYPlot
          margin={{ left: 50 }}
          yDomain={[0, 3900]}
          onMouseLeave={() => this.setState({ value: false })}
          width={1100}
          height={400}
        >
          <VerticalGridLines tickTotal={43} />
          <XAxis
            tickFormat={v => labelsBubble[v - 1]}
            tickTotal={43}
            tickSize={1}
          />
          <YAxis />
          <MarkSeriesCanvas {...markSeriesProps} />
          {this.state.value ? (
            <Hint value={this.state.value}>
              <HintContentBubble value={this.state.value} />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

export function HintContentBubble({ value }) {
  const { x, y } = value;
  return (
    <div>
      {hintRowBubble({ numberOfMinerals: y, components: labelsBubble[x - 1] })},
 </div>
  );
}

function hintRowBubble({ numberOfMinerals, components }) {
  return (
    <Paper
      style={{
        backgroundColor: "rgb(105,105,105)",
        alignItems: "center",
        borderRadius: 4,
        padding: 8,
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
      }}
    >
      <div style={{ fontSize: "12px", color: "white" }}>
        {numberOfMinerals}
        {numberOfMinerals > 1 ? " minerals" : " mineral"}
        {" contain "}
        {components}
      </div>
    </Paper>
  );
}

function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

function ControlledExpansionPanels(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        style={{ width: window.innerWidth - 180, borderRadius: 15 }}
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
        <ExpansionPanelDetails>{props.value}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
const mineralColors = [
  "Yellow",
  "Orange",
  "Black",
  "Blue",
  "Bluish-green",
  "Brown",
  "Cream",
  "Green",
  "Greenish-blue",
  "Grey",
  "Pale brown",
  "Pink",
  "Purple",
  "Red-brown",
  "Red",
  "Violet",
  "Yellow-orange"
];

const mineralSystems = [
  "Triclinic",
  "Monoclinic",
  "Orthorhombic",
  "Hexagonal",
  "Tetragonal",
  "Trigonal",
  "Isometric"
];

const mineralGroups = [
  "Elements",
  "Sulfides",
  "Sulfosalts",
  "Halides",
  "Oxides",
  "Carbonates",
  "Nitrates",
  "Borates",
  "Sulfates",
  "Phosphates",
  "Arsenates",
  "Vanadates",
  "Silicates",
  "Organic Compounds"
];

const mineralSubGroups = [
  "Metals",
  "Metalloids",
  "Nonmetals",
  "Carbides",
  "Silicides",
  "Nitrides",
  "Phosphides",
  "Selenides",
  "Tellurides",
  "Arsenides",
  "Antimonides",
  "Bismuthides",
  "Sulfarsenites",
  "Sulfantimonites",
  "Sulfbismuthies",
  "Oxysulfosalts",
  "Complex Halides",
  "Oxyhalides",
  "Hydroxyhalides",
  "Iodates",
  "Nitrates",
  "Monoborates",
  "Diborates",
  "Triborates",
  "Tetraborates",
  "Pentaborates",
  "Hexaborates",
  "Heptaborates",
  "Chromates",
  "Uranyl sulfates",
  "Molybdates",
  "Wolframates",
  "Niobates",
  "Nesosilicates",
  "Sorosilicates",
  "Cyclosilicates",
  "Inosilicates",
  "Phyllosilicates",
  "Tektosilicates",
  "Germanates",
  "Unclassified"
];


export function loadingDiamond() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
}


export default StatsPage;