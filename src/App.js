import React, { Component } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { Menu } from "./MenuComponents";
import { elements } from "./periodic-table";
import Statistics from "./components/Statistics/Statistics";
import SearchPage from "./components/SearchPage/SearchPage";
import MineralInfoPage from "./components/MineralInfoPage/MineralInfoPage";
import Map from "./components/Map/Map";
import { getColorInTable } from "./helpers";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementSymbols: elements.slice().map(el => {
        return el.symbol;
      }),
      clickedElements: Array(120).fill(false),
      mineralResults: null,
      choosenCreatedMineral:
        JSON.parse(localStorage.getItem("choosenCreatedMineral")) || null
    };
    this.handleElementClick = this.handleElementClick.bind(this);
  }

  handleElementClick(el) {
    const elementSymbols = this.state.elementSymbols;
    const clickedElements = this.state.clickedElements.slice();
    clickedElements[elementSymbols.indexOf(el)] = !clickedElements[
      elementSymbols.indexOf(el)
    ];
    this.setState({
      clickedElements: clickedElements
    });
  }

  deleteElements() {
    this.setState({
      clickedElements: Array(120).fill(false),
      mineralResults: null
    });
  }

  renderElement(elementNum) {
    let element = elements[elementNum];
    const clickedElements = this.state.clickedElements;
    if (clickedElements[elementNum]) {
      return (
        <Element
          className="selected-element"
          value={element}
          onClick={() => this.handleElementClick(element.symbol)}
        />
      );
    } else {
      return (
        <Element
          className="not-selected-element"
          value={element}
          onClick={() => this.handleElementClick(element.symbol)}
        />
      );
    }
  }

  renderTable() {
    let periodicTable = [];
    for (let element_num = 1; element_num < 58; element_num++) {
      periodicTable.push(this.renderElement(element_num));
    }
    for (let element_num = 72; element_num < 90; element_num++) {
      periodicTable.push(this.renderElement(element_num));
    }
    for (let element_num = 104; element_num < 119; element_num++) {
      periodicTable.push(this.renderElement(element_num));
    }
    return periodicTable;
  }

  createMineral() {
    this.setState({
      mineralResults: null
    });
    const nameList = this.state.elementSymbols;
    const clickedElementsList = this.state.clickedElements;
    if (clickedElementsList.every(el => el === false)) {
      return;
    } else {
      const choosenElements = nameList
        .map(elementName => {
          if (clickedElementsList[nameList.indexOf(elementName)]) {
            return elementName;
          }
        })
        .filter(Boolean);
      const result = searchMineralsByElements(choosenElements);
      this.setState({
        mineralResults: result
      });
    }
  }

  renderCreatedMinerals(resultsArray) {
    if (resultsArray) {
      return (
        <Container maxWidth="lg" style={{ padding: 20 }}>
          <Grid container justify="center" spacing={2} alignItems="center">
            {resultsArray.map(rock => (
              <Grid item>
                <Paper className="main-min-results">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        alt="Something"
                        src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${rock.color[0].toLowerCase()}.svg`}
                      />
                    </Grid>
                    <Grid item>
                      <div
                        style={{ fontSize: 15, marginBottom: 0, paddingTop: 0 }}
                      >
                        <Link
                          to="/mineralResults"
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontWeight: "bold"
                          }}
                          onClick={() =>
                            this.setState(
                              {
                                choosenCreatedMineral: rock
                              },
                              () => {
                                localStorage.setItem(
                                  "choosenCreatedMineral",
                                  JSON.stringify(
                                    this.state.choosenCreatedMineral
                                  )
                                );
                              }
                            )
                          }
                        >
                          {rock.name}
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }
  }

  render() {
    const Home = () => (
      <div>
        <Menu title="Crystallizer" />
        <main className="content">
          <Container
            maxWidth="lg"
            className="container"
            style={{ paddingLeft: 20 }}
          >
            <div className="table-wrapper">
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <div
                className="table-background"
                style={{
                  backgroundImage: `url(https://crystallizer.s3.eu-west-2.amazonaws.com/bluish-green.svg`
                }}
              >
                <div className="periodic-table">
                  <section className="card1">{this.renderTable()}</section>
                </div>
              </div>
              <div className="button-container">
                <Button
                  variant="contained"
                  className="button-create"
                  onClick={() => this.createMineral()}
                >
                  Create mineral
                </Button>
                <IconButton
                  className="bin"
                  onClick={() => this.deleteElements()}
                >
                  <DeleteOutlinedIcon
                    style={{ color: "black" }}
                    className="material-icons"
                  />
                </IconButton>
              </div>
              <div className="result-count">
                {this.state.mineralResults != null
                  ? `${this.state.mineralResults.length} results`
                  : ``}
              </div>
              {this.renderCreatedMinerals(this.state.mineralResults)}
            </div>
          </Container>
        </main>
      </div>
    );

    return (
      <div className="root">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <CssBaseline />
        <Router>
          <Switch>
            <Route
              path="/map"
              render={renderProps => (
                <div>
                  <Map {...this.props} {...renderProps} />
                </div>
              )}
            />
            <Route
              path={"/statistics"}
              render={renderProps => (
                <div>
                  <Statistics {...this.props} {...renderProps} />
                </div>
              )}
            />
            <Route
              path={"/search"}
              render={renderProps => (
                <div>
                  <SearchPage {...this.props} {...renderProps} />
                </div>
              )}
            />
            <Route
              path="/mineralResults"
              render={renderProps => (
                <div>
                  <MineralInfoPage
                    value={this.state.choosenCreatedMineral}
                    {...this.props}
                    {...renderProps}
                  />
                </div>
              )}
            />
            <Route
              path="/"
              render={renderProps => (
                <div>
                  <Home {...this.props} {...renderProps} />
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

function Element(props) {
  const thisColor = getColorInTable(props.value.symbol);
  return (
    <div
      style={{
        backgroundColor:
          props.className === "selected-element" ? "white" : thisColor,
        color: props.className === "selected-element" ? thisColor : "white",
        borderColor:
          props.className === "selected-element" ? thisColor : "white",
        borderStyle: props.className === "selected-element" ? "dashed" : "solid"
      }}
      id={props.value.symbol}
      className={props.className}
      onClick={props.onClick}
    >
      <div className="number">{props.value.number}</div>
      <div className="symbol">{props.value.symbol}</div>
      <div className="element-name">{props.value.name}</div>
    </div>
  );
}

function searchMineralsByElements(arrayOfElements) {
  const resultList = [];
  if (arrayOfElements.length > 0) {
    const data = require("./data.json");
    const elements = arrayOfElements;
    for (let i = 0; i < Object.keys(data.minerals).length; i++) {
      if (elements.every(elem => data.minerals[i].formula.includes(elem))) {
        resultList.push(data.minerals[i]);
      }
    }
  }
  return resultList;
}

export default App;
