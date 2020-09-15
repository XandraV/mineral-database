import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Home";
import MineralInfoPage from "./components/MineralInfoPage/MineralInfoPage";
import Map from "./Map";
import Statistics from "./components/Statistics/Statistics";
import SearchPage from "./SearchPage";
import { MineralContextContainer } from "./MineralContextContainer";
import "./App.css";

const App = () => {
    return (
      <div className="root">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <CssBaseline />
        <Router>
          <Switch>
            <MineralContextContainer>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/mineralResults">
                <MineralInfoPage  />
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
      </div>
    );
  }



export default App;
