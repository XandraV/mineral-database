import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import MineralInfoPage from "../MineralInfoPage/MineralInfoPage";
import { demoAsyncCall, getAllMinerals, handleSearch } from "../../helpers";
import { Menu } from "../../MenuComponents";
import SearchResultItem from "./SearchResultItem";
import "./../../App.css";

function SearchPage() {
  const [clickedMineral, setClickedMineral] = useState(null);
  const [value, setValue] = useState("");
  const [results, setResults] = useState(getAllMinerals());
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => setLoading(false));
  });

  function handleMineralClick(mineral) {
    setClickedMineral(mineral);
    localStorage.setItem(
      "choosenCreatedMineral",
      JSON.stringify(clickedMineral)
    );
  }

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
            {results.slice(0, limit).map(mineral => (
              <Grid item>
                <Card className="result-item-wrapper">
                  <Link
                    to="/mineralResults"
                    onClick={() => handleMineralClick(mineral)}
                  >
                    <SearchResultItem mineralItem={mineral} />
                  </Link>
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
      width: document.documentElement.clientWidth,
    };
    return (
      <MuiThemeProvider>
        <div>
          <Menu title="Mineral Search" />
          <main className="search-page-wrapper" style={mainElement}>
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

  return clickedMineral != null ? (
    <MineralInfoPage value={clickedMineral} />
  ) : (
    renderSearchPage()
  );
}

export default SearchPage;
