import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MineralInfoPage from "../MineralInfoPage/MineralInfoPage";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import { mineralColors } from "../Statistics/dashboardData";
import {
  demoAsyncCall,
  getAllMinerals,
  handleSearchMineralsList
} from "../../helpers";
import { Menu } from "../../Menu";
import BinButton from "../../BinButton";
import "./../../App.css";

function SearchPage() {
  const originalList = getAllMinerals();
  const [chosenMineral, setChosenMineral] = useState(null);
  const [value, setValue] = useState("");
  const [results, setResults] = useState(originalList);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
  const [selectedColor, setSelectedColor] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedSubGroup, setSelectedSubGroup] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState([]);

  useEffect(() => {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => setLoading(false));
  });

  function updateMineralsList(newColor) {
    setSelectedColor(newColor);
    const originalMineralsArray = originalList;
    const filterColors = newColor;
    if (filterColors.length > 0) {
      setResults(
        originalMineralsArray.filter(el => {
          return el.color[0].includes(newColor);
        })
      );
    } else {
      setResults(originalMineralsArray);
    }
    setChosenMineral(null);
  }

  function resetSearch() {
    setResults(originalList);
    setSelectedColor(false);
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
            {results.slice(0, limit).map(rock => (
              <Grid item>
                <Card className="result-item-wrapper">
                  <CardActionArea onClick={() => setChosenMineral(rock)}>
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
    console.log(selectedColor);
    const searchBar = {
      margin: "0 auto",
      width: 500,
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
            <Container maxWidth="lg" className="search-page-container">
              <Grid container spacing={2}>
                <Grid item style={{ paddingLeft: 380 }}>
                  <SearchBar
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    onRequestSearch={() =>
                      setResults(handleSearchMineralsList(value))
                    }
                    style={searchBar}
                  />
                </Grid>
                <Grid item>
                  <div className="filter-wrapper">
                    <Paper className="search-minerals-list">
                      <FormControl style={{ marginBottom: 50 }}>
                        <InputLabel>Color</InputLabel>
                        <Select
                          disableUnderline
                          value={selectedColor?selectedColor:null}
                          className="search-properties-select"
                        >
                          {mineralColors.map(color => (
                            <MenuItem key={color} value={color}>
                              <ListItemText
                                primary={color}
                                onClick={() => updateMineralsList(color)}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </div>
                  <BinButton onClick={() => resetSearch()} />
                </Grid>
              </Grid>
            </Container>
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

  return chosenMineral != null ? (
    <MineralInfoPage value={chosenMineral} />
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
