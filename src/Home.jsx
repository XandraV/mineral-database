import React, { useContext, useEffect } from "react";
import BinButton from "./BinButton";
import StyledButton from "./StyledButton";
import Container from "@material-ui/core/Container";
import Menu from "./Menu";
import PeriodicTable from "./PeriodicTable"
import SearchResults from "./SearchResults";
import { MineralContext } from "./MineralContext";
import { elements } from "./data/periodic-table";
import styled from "styled-components/macro";

const HomeWrapper = styled.div`
background-position: center;
background-repeat: no-repeat;
background-size: 200% 200%;
background-image: url('https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg');
  height: ${window.innerHeight}px;
  overflow-x: hidden;
  .home-container {
    padding-top: 2rem;
    text-align: center;
    display: inline-block;
    flex-grow: 1;
    padding-left: 4rem;
    height: ${window.innerHeight}px;
  }
  .button-container {
    padding: 2rem;
  }
`;

function Home() {
  const { clickedElements, mineralResults, chosenMineral } = useContext(
    MineralContext
  );
  const [selectedElements, setSelectedElements] = clickedElements;
  const [results, setResults] = mineralResults;
  const [selectedMineral, setSelectedMineral] = chosenMineral;

  useEffect(() => {
    if (document.getElementById("scroller")) {
      document.getElementById("scroller").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const selectElement = (elementNum) => {
    let items = [...selectedElements];
    let item = !items[elementNum];
    items[elementNum] = item;
    setSelectedElements(items);
  };

  const unselectAllElements = () => {
    setSelectedElements(Array(120).fill(false));
    setResults(null);
  };

  const searchMineralsByElements = (arrayOfElements) => {
    const resultList = [];

    const jsonData = require("./data/data.json");
    const allMinerals = [];
    for (let i in jsonData) allMinerals.push(jsonData[i]);

    if (arrayOfElements.length > 0) {
      for (let mineralObj of allMinerals[0]) {
        if (
          arrayOfElements.every((elem) => mineralObj.formula.includes(elem))
        ) {
          resultList.push(mineralObj);
        }
      }
    }
    return resultList;
  };

  const searchMineral = () => {
    const elementSymbols = elements.slice().map((el) => {
      return el.symbol;
    });
    setResults(null);
    if (selectedElements.every((el) => el === false)) return;
    else {
      const indices = selectedElements.reduce(
        (acc, cur, idx) => (cur ? acc.concat(idx) : acc),
        []
      );
      const chosenElements = indices.map((idx) => elementSymbols[idx]);
      const searchResults = searchMineralsByElements(chosenElements);
      setResults(searchResults);
    }
  };

  return (
    <HomeWrapper>
      <Menu title="Crystallizer" />
      <Container className="home-container" maxWidth="lg">
        <PeriodicTable
          selectElement={selectElement}
          selectedElements={selectedElements}
        />
        <div className="button-container">
          <StyledButton onClick={() => searchMineral()}>search</StyledButton>
          <BinButton onClick={() => unselectAllElements()} />
        </div>
        <SearchResults setSelectedMineral={setSelectedMineral} mineralResults={results} />
      </Container>
    </HomeWrapper>
  );
}
export default Home;
