import React, { Component } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { mainListItems } from "./listItems";
import { elements } from "./periodic-table";
import StatsPage from "./Statistics";
import SearchPage from "./SearchPage";
import MineralInfoPage from "./MineralInfoPage";
import "./App.css";
import { chooseMineralPic } from "./MineralInfoPage";
import blue from "./images/bluish-green.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: elements.slice().map(el => {
        return el.symbol;
      }),
      clicked: Array(118).fill(false),
      createdMineral: null,
      choosenCreatedMineral:
        JSON.parse(localStorage.getItem("choosenCreatedMineral")) || null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const names = this.state.names;
    const clicked = this.state.clicked.slice();
    clicked[names.indexOf(i)] = !clicked[names.indexOf(i)];
    this.setState({
      clicked: clicked
    });
  }

  renderElement(i) {
    let element = elements[i];
    const names = this.state.names;
    const clicked = this.state.clicked.slice();
    if (clicked[names.indexOf(elements[i].symbol)]) {
      return (
        <Element
          className="yellowButton"
          value={element}
          onClick={() => this.handleClick(element.symbol)}
        />
      );
    } else {
      return (
        <Element
          className="blackButton"
          value={element}
          onClick={() => this.handleClick(element.symbol)}
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
      createdMineral: null
    });
    const nameList = this.state.names;
    const clickedList = this.state.clicked;
    if (clickedList.every(el => el === false)) {
      return;
    } else {
      const choosenElements = nameList
        .map(elementName => {
          if (clickedList[nameList.indexOf(elementName)]) {
            return elementName;
          }
        })
        .filter(Boolean);
      const result = search(choosenElements);
      this.setState({
        createdMineral: result
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
                <Paper
                  className="paper"
                  style={{
                    height: 50,
                    width: 250,
                    textAlign: "center",
                    borderBottomLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundImage: `url(${"https://i2.wp.com/www.123freevectors.com/wp-content/original/131393-abstract-light-blue-triangle-geometric-background.jpg?w=800&q=95"})`,
                    boxShadow: '0px 0px 8px grey',
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        alt="Something"
                        src={require("./images/" +
                          chooseMineralPic(rock.color[0]) +
                          ".svg")}
                      />
                    </Grid>
                    <Grid item>
                      <div
                        style={{ fontSize: 15, marginBottom: 0, paddingTop: 0 }}
                      >
                        <Link
                          to="/createdMineral"
                          style={{ textDecoration: "none", color: "white", fontWeight: 'bold' }}
                          onClick={() =>
                            this.setState({
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
    const createButtonStyle = {
      background: "#009faf",
      borderRadius: 25,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 20px",
      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
      transition: "all 0.3s ease 0s",
      fontWeight: 'bold'
    };

    const Home = () => (
      <div>
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
              {"Crystallizer"}
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
              <div className="tableBackground"
                style={{
                  backgroundImage: `url(${blue})`
                }}
              >
                <div className="periodic-table">
                  <section className="card1">{this.renderTable()}</section>
                </div>
              </div>
              <div className="button-container">
                <Button
                  style={createButtonStyle}
                  variant="contained"
                  className="button-create"
                  onClick={() => this.createMineral()}
                >
                  Create mineral
                </Button>
                <IconButton
                  className="bin"
                  style={{
                    position: "absolute",
                    transition: "all 0.3s ease 0s"
                  }}
                  onClick={() =>
                    this.setState({
                      clicked: Array(19).fill(false),
                      createdMineral: null
                    })
                  }
                >
                  <DeleteOutlinedIcon
                    style={{ color: "black" }}
                    className="material-icons"
                  />
                </IconButton>
              </div>
              <div className="result-count">{this.state.createdMineral != null ? `${this.state.createdMineral.length} results` :``}</div>
              {this.renderCreatedMinerals(this.state.createdMineral)}
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
              path={"/statistics"}
              render={renderProps => (
                <div>
                  <StatsPage {...this.props} {...renderProps} />
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
              path="/createdMineral"
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
  const thisColor = getColor(props.value.symbol);
  return (
    <div
      style={{
        backgroundColor:
          props.className === "yellowButton" ? "white" : thisColor,
        color:
          props.className === "yellowButton" ? thisColor : "white",
        borderColor:
          props.className === "yellowButton" ? thisColor : "white",
        borderStyle:
          props.className === "yellowButton" ? "dashed" : "solid"
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

function getColor(symbol) {
  switch (symbol) {
    case "H":
    case "C":
    case "N":
    case "O":
    case "P":
    case "S":
    case "Se":
      return "#9575cd";
    case "Li":
    case "Na":
    case "K":
    case "Rb":
    case "Cs":
    case "Fr":
      return "#14cba8";
    case "Be":
    case "Mg":
    case "Ca":
    case "Sr":
    case "Ba":
    case "Ra":
      return "#ff1744";
    case "Al":
    case "Ga":
    case "In":
    case "Sn":
    case "Tl":
    case "Pb":
    case "Bi":
    case "Nh":
    case "Fl":
    case "Mc":
    case "Lv":
      return "#ffb300";
    case "B":
    case "Si":
    case "Ge":
    case "As":
    case "Te":
    case "Po":
    case "Sb":
      return "#00838f";
    case "F":
    case "Cl":
    case "Br":
    case "I":
    case "At":
    case "Ts":
      return "#ff6d00";
    case "He":
    case "Ne":
    case "Ar":
    case "Kr":
    case "Xe":
    case "Rn":
    case "Og":
      return "#673ab7";
    default:
      return "#1565c0";
  }
}

function search(arrayOfElements) {
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