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
import Avatar from "@material-ui/core/Avatar";
import {
  demoAsyncCall,
  getAllMinerals,
  handleSearchMineralsList
} from "../../helpers";
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

  function renderSearchResults() {
    if (results) {
      return (
        <div className="grid-container">
          <Grid
            className="search-results-container"
            container
            justify="center"
            spacing={2}
            alignItems="center"
          >
            {results.slice(0, limit).map(rock => (
              <Grid item>
                <Card className="result-item-wrapper">
                  <CardActionArea onClick={() => setChoosenMineral(rock)}>
                    <MineralListItem mineralItem={rock} />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="load-more-btn-container">
            <Button
              variant="contained"
              className="load-more"
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
      height: window.innerHeight,
      width: document.documentElement.clientWidth
    };
    return (
      <MuiThemeProvider>
        <div>
          <Menu title="Mineral Search" />
          <main className="search-page-wrapper" style={mainElement}>
            <SearchBar
              value={value}
              onChange={newValue => setValue(newValue)}
              onRequestSearch={() =>
                setResults(handleSearchMineralsList(value))
              }
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
  const color = props.mineralItem.color[0].toLowerCase();
  return (
    <Grid container spacing={1} alignItems="center" style={{ padding: 18 }}>
      <Grid item>
        <div className="outter-circle">
          <div className="inner-circle">
            <Avatar
              style={{
                margin: 10,
                width: 80,
                height: 80,
                backgroundColor: "white",
                display: "inline-block"
              }}
              alt="Something"
              src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${color}.svg`}
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
