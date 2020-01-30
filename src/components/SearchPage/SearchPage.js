import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MineralInfoPage from "../MineralInfoPage/MineralInfoPage";
import { chooseMineralPic } from "../MineralInfoPage/MineralInfoPageComponents";
import Avatar from "@material-ui/core/Avatar";
import { demoAsyncCall, getAllMinerals, handleSearch } from "../../helpers";
import { Menu } from "../../MenuComponents";
import "./../../App.css";

function SearchPage() {
  const [choosenMineral, setChoosenMineral] = useState(null);
  const [value, setValue] = useState("");
  const [results, setResults] = useState(getAllMinerals());
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => setLoading(false));
  });

  const loadMoreButton = {
    background: "#009faf",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 20px",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    transition: "all 0.3s ease 0s",
    fontWeight: "bold"
  };
  function renderSearchResults() {
    if (results) {
      return (
        <div style={{ textAlign: "center" }}>
          <Grid
            container
            justify="center"
            spacing={2}
            alignItems="center"
            style={{ height: 350, flexGrow: 1, overflow: "auto" }}
          >
            {results.slice(0, limit).map(rock => (
              <Grid item>
                <Card
                  style={{
                    height: 140,
                    width: 300,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.7)"
                  }}
                >
                  <CardActionArea onClick={() => setChoosenMineral(rock)}>
                    <MineralListItem mineralItem={rock} />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="button-container">
            <Button
              style={loadMoreButton}
              variant="contained"
              className="button-create"
              onClick={() => setLimit(limit + 8)}
            >
              Load more
            </Button>
          </div>
        </div>
      );
    }
  }

  function renderSearchPage() {
    const searchBar = {
      margin: "0 auto",
      width: 800,
      borderRadius: 15
    };
    const mainElement = {
      paddingTop: 100,
      justify: "center",
      alignItems: "center",
      height: window.innerHeight,
      width: document.documentElement.clientWidth,
      backgroundSize: "cover"
    };
    return (
      <MuiThemeProvider>
        <div>
          <Menu title="Mineral Search" />
          <main style={mainElement}>
            <SearchBar
              value={value}
              onChange={newValue => setValue(newValue)}
              onRequestSearch={() => setResults(handleSearch(value))}
              style={searchBar}
            />
            <Container
              maxWidth="lg"
              style={{ padding: 20, position: "relative" }}
            >
              <div>
                {loading ? (
                  <CircularProgress
                    style={{ marginLeft: "50%" }}
                    left={-20}
                    size={40}
                  />
                ) : (
                  renderSearchResults()
                )}
              </div>
            </Container>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }

  return choosenMineral != null ? (
    <MineralInfoPage value={choosenMineral} />
  ) : (
    renderSearchPage()
  );
}

function MineralListItem(props) {
  return (
    <Grid container spacing={1} alignItems="center" style={{ padding: 18 }}>
      <Grid item>
        <div className="outterCircle">
          <div className="innerCircle">
            <Avatar
              style={{
                margin: 10,
                width: 80,
                height: 80,
                backgroundColor: "white",
                display: "inline-block"
              }}
              alt="Something"
              src={require("./../../images/" +
                chooseMineralPic(props.mineralItem.color[0]) +
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
            {props.mineralItem.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: 12 }}
          >
            {`${props.mineralItem.color[0]} mineral`}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
}

export default SearchPage;
