import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { mainListItems } from "./listItems";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MineralInfoPage, { chooseMineralPic } from "./MineralInfoPage";
import Avatar from "@material-ui/core/Avatar";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenMineral: null,
      value: "",
      results: getAllMinerals(),
      loading: true,
      loaded: false,
      limit: 8
    };
  }

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false, loaded: true }));
  }

  onLoadMore() {
    this.setState({
      limit: this.state.limit + 8
    });
  }

  renderSearchResults() {
    if (this.state.results) {
      return (
        <div style={{ textAlign: "center" }}>
          <Grid
            container
            justify="center"
            spacing={2}
            alignItems="center"
            style={{ height: 350, flexGrow: 1, overflow: "auto" }}
          >
            {this.state.results.slice(0, this.state.limit).map(rock => (
              <Grid item>
                <Card style={{ height: 140, width: 300, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.7)" }}>
                  <CardActionArea
                    onClick={() => this.setState({ choosenMineral: rock })}
                  >
                    <Grid container spacing={1} alignItems="center" style={{padding:18}}>
                      <Grid item>
                        <div
                          style={{
                            width: 110,
                            height: 110,
                            backgroundColor: "#80deea",
                            borderRadius: "50%",
                            boxShadow:'0px 0px 8px #009faf',
                          }}
                        >
                          <div
                            style={{
                              margin: 5,
                              width: 100,
                              height: 100,
                              backgroundColor: "#009faf",
                              display: "inline-block",
                              borderRadius: "50%"
                            }}
                          >
                            <Avatar
                              style={{
                                margin: 10,
                                width: 80,
                                height: 80,
                                backgroundColor: "white",
                                display: "inline-block",
                              }}
                              alt="Something"
                              src={require("./images/" +
                                chooseMineralPic(rock.color[0]) +
                                ".svg")}
                            />
                          </div>
                        </div>
                      </Grid>
                      <Grid item>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h5"
                            style={{ color: "black", fontSize: 15 }}
                          >
                            {rock.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{ fontSize: 12 }}
                          >
                            {`${rock.color[0]} mineral`}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="button-container">
            <Button
              style={{
                background: "#009faf",
                borderRadius: 25,
                border: 0,
                color: "white",
                height: 48,
                padding: "0 20px",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                transition: "all 0.3s ease 0s",
                fontWeight: 'bold'
              }}
              variant="contained"
              className="button-create"
              onClick={() => this.onLoadMore()}
            >
              Load more
            </Button>
          </div>
        </div>
      );
    }
  }

  renderSearchPage() {
    return (
      <MuiThemeProvider>
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
                {"Mineral Search"}
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
              paddingTop: 100,
              justify: "center",
              alignItems: "center",
              height: window.innerHeight,
              width: document.documentElement.clientWidth,
              backgroundSize: "cover"
            }}
          >
            <SearchBar
              value={this.state.value}
              onChange={newValue => this.setState({ value: newValue })}
              onRequestSearch={() =>
                this.setState({ results: handleSearch(this.state.value) })
              }
              style={{
                margin: "0 auto",
                width: 800,
                borderRadius: 15
              }}
            />
            <Container
              maxWidth="lg"
              style={{ padding: 20, position: "relative" }}
            >
              <div>
                {this.state.loading ? (
                  <CircularProgress
                    style={{ marginLeft: "50%" }}
                    left={-20}
                    size={40}
                  />
                ) : (
                  this.renderSearchResults()
                )}
              </div>
            </Container>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }

  render() {
    return this.state.choosenMineral != null ? (
      <MineralInfoPage value={this.state.choosenMineral} />
    ) : (
      this.renderSearchPage()
    );
  }
}
function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

export function handleSearch(input) {
  const data = require("./data.json");
  const resultList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    if (data.minerals[i].name.toLowerCase().includes(input.toLowerCase())) {
      resultList.push(data.minerals[i]);
    }
  }
  console.log(resultList);
  return resultList;
}

export function getAllMinerals() {
  const data = require("./data.json");
  const allMineralsList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    allMineralsList.push(data.minerals[i]);
  }
  return allMineralsList;
}

export default SearchPage;
