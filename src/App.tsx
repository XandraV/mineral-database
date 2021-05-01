import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MineralContextContainer } from "./MineralContextContainer";

const Home = lazy(() => import("./Home"));
const InfoPage = lazy(() => import("./InfoPage"));
const StatisticsPage = lazy(() => import("./StatisticsPage"));
const MineralMap = lazy(() => import("./MineralMap"));

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Suspense
        fallback={
          <div>
            Loading...
            <CircularProgress color="secondary" />
          </div>
        }
      >
        <Switch>
          <MineralContextContainer>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/mineral-results">
              <InfoPage />
            </Route>
            <Route exact path={"/statistics"}>
              <StatisticsPage />
            </Route>
            <Route exact path={"/map"}>
              <MineralMap />
            </Route>
          </MineralContextContainer>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
