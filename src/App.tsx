import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MineralContextProvider } from "./MineralContextProvider";
import PageWrapper from "./PageWrapper";
import LoadingPage from "./LoadingPage";
import Menu from "./Menu";
import { LoadScript } from "@react-google-maps/api";

const Home = lazy(() => import("./Home"));
const PeriodicTablePage = lazy(() => import("./PeriodicTablePage"));
const InfoPage = lazy(() => import("./InfoPage"));
const ElementsPage = lazy(() => import("./ElementsPage"));
const DatabaseSearchPage = lazy(() => import("./DatabaseSearchPage"));
const MineralMap = lazy(() => import("./MineralMap"));

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <PageWrapper>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <MineralContextProvider>
              <Menu />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/periodic">
                <PeriodicTablePage />
              </Route>
              <Route exact path="/mineral-results">
                <InfoPage />
              </Route>
              <Route exact path={"/elements"}>
                <ElementsPage />
              </Route>
              <Route exact path={"/search"}>
                <DatabaseSearchPage />
              </Route>
              <Route exact path={"/map"}>
                <LoadScript
                  googleMapsApiKey={"AIzaSyB-MoxByZICIjkMb-bNrt0tvDCqcqOs7yo"}
                  libraries={["geometry"]}
                >
                  <MineralMap />
                </LoadScript>
              </Route>
            </MineralContextProvider>
          </Switch>
        </Suspense>
      </PageWrapper>
    </Router>
  );
};

export default App;
