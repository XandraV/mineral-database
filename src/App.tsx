import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MineralContextContainer } from "./MineralContextContainer";
import { PageWrapper } from "./PageWrapper";
import LoadingPage from "./LoadingPage";
const Home = lazy(() => import("./Home"));
const InfoPage = lazy(() => import("./InfoPage"));
const StatisticsPage = lazy(() => import("./StatisticsPage"));
const MineralMap = lazy(() => import("./MineralMap"));

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <PageWrapper>
        <Suspense fallback={<LoadingPage />}>
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
      </PageWrapper>
    </Router>
  );
};

export default App;
