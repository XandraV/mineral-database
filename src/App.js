import React, { Component } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { Menu } from "./Menu";
import { elements } from "./periodic-table";
import Statistics from "./components/Statistics/Statistics";
import SearchPage from "./components/SearchPage/SearchPage";
import MineralInfoPage from "./components/MineralInfoPage/MineralInfoPage";
import Map from "./components/Map/Map";
import { searchMineralsByElements } from "./helpers";
import Element from "./Element";
import CreateMineralButton from "./CreateMineralButton";
import BinButton from "./BinButton";
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
      chosenCreatedMineral:
        JSON.parse(localStorage.getItem("chosenCreatedMineral")) || null
    };
    this.handleElementClick = this.handleElementClick.bind(this);
  }

  handleElementClick(elementNum) {
    const clickedElements = this.state.clickedElements;
    clickedElements[elementNum] = !clickedElements[elementNum];
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
          key={elementNum}
          className="selected-element"
          value={element}
          onClick={() => this.handleElementClick(elementNum)}
        />
      );
    } else {
      return (
        <Element
          key={elementNum}
          className="not-selected-element"
          value={element}
          onClick={() => this.handleElementClick(elementNum)}
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
    if (this.state.clickedElements.every(el => el === false)) {
      return;
    } else {
      const indices = this.state.clickedElements.reduce(
        (out, bool, index) => (bool ? out.concat(index) : out),
        []
      );
      const chosenElements = indices.map(index => {
        return this.state.elementSymbols[index];
      });
      const searchResults = searchMineralsByElements(chosenElements);
      this.setState({
        mineralResults: searchResults
      });
    }
  }

  renderCreatedMinerals(resultsArray) {
    if (resultsArray) {
      return (
        <Container maxWidth="lg" style={{ padding: 20 }}>
          <Grid container justify="center" spacing={2} alignItems="center">
            {resultsArray.map(mineral => (
              <Grid item>
                <Paper className="main-min-results">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <MineralAvatar mineral={mineral} />
                    </Grid>
                    <Grid item>
                      <div>
                        <Link
                          className="min-link"
                          to="/mineralResults"
                          onClick={() =>
                            this.setState(
                              {
                                chosenCreatedMineral: mineral
                              },
                              () => {
                                localStorage.setItem(
                                  "chosenCreatedMineral",
                                  JSON.stringify(
                                    this.state.chosenCreatedMineral
                                  )
                                );
                              }
                            )
                          }
                        >
                          {mineral.name}
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
          <Container className="home-container" maxWidth="lg">
            <div className="table-wrapper">
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <div className="table-background">
                <div className="periodic-table">
                  <section className="card1">{this.renderTable()}</section>
                </div>
              </div>
              <div className="button-container">
                <CreateMineralButton onClick={() => this.createMineral()} />
                <BinButton onClick={() => this.deleteElements()} />
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
                    value={this.state.chosenCreatedMineral}
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

function MineralAvatar(props) {
  return (
    <Avatar
      alt="Something"
      src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${props.mineral.color[0].toLowerCase()}.svg`}
    />
  );
}

export default App;
