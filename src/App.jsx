import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MineralContextContainer } from "./MineralContextContainer";

const Home = lazy(() => import("./Home"));
const InfoPage = lazy(() => import("./InfoPage"));
const Map = lazy(() => import("./Map"));
const Statistics = lazy(() => import("./Statistics"));
const SearchPage = lazy(() => import("./SearchPage"));

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Router>
  );
};

export default App;
