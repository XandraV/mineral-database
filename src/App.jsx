import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Home";
import InfoPage from "./InfoPage";
import Map from "./Map";
import Statistics from "./Statistics";
import SearchPage from "./SearchPage";
import { MineralContextContainer } from "./MineralContextContainer";
import "./App.css";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <MineralContextContainer>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mineral-results">
            <InfoPage />
          </Route>
          <Route exact path={"/search"}>
            <SearchPage />
          </Route>
          <Route exact path={"/statistics"}>
            <Statistics />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
        </MineralContextContainer>
      </Switch>
    </Router>
  );
};

export default App;
