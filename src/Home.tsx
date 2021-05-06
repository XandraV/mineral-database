import React, { useContext, useEffect } from "react";
import BinButton from "./BinButton";
import Menu from "./Menu";
import PeriodicTable from "./PeriodicTable";
import SearchResults from "./SearchResults";
import StyledButton from "./StyledButton";
import { MineralContext } from "./MineralContext";
import { elements } from "./data/periodictable";
import styled from "styled-components/macro";
import { minerals} from './data/minerals';

const Wrapper = styled.div`
  text-align: center;
  margin-left: 100px;

  .button-container {
    padding: 1rem;
  }
`;

const Home = () => {
  const { clickedElements, mineralResults, chosenMineral } = useContext<any>(
    MineralContext
  );
  const [selectedElements, setSelectedElements] = clickedElements;
  const [results, setResults] = mineralResults;
  const [selectedMineral, setSelectedMineral] = chosenMineral;
  
  useEffect(() => {
    if (document.getElementById("scroller")) {
      document
        .getElementById("scroller")!
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const selectElement = (elementNum: number) => {
    let items = [...selectedElements];
    let item = !items[elementNum];
    items[elementNum] = item;
    setSelectedElements(items);
  };

  const unselectAllElements = () => {
    setSelectedElements(Array(120).fill(false));
    setResults(null);
  };

  const searchMineralsByElements = (arrayOfElements: Array<object>) => {
    const resultList = [];
    if (arrayOfElements.length > 0) {
      for (let mineralObj of minerals) {
        if (
          arrayOfElements.every((elem:any) => mineralObj.formula.includes(elem))
        ) {
          resultList.push(mineralObj);
        }
      }
    }
    return resultList;
  };

  const searchMineral = () => {
    const elementSymbols = elements.slice().map((element) => {
      return element.symbol;
    });
    setResults(null);
    if (selectedElements.every((element: boolean) => element === false)) return;
    else {
      const indices = selectedElements.reduce(
        (acc: Array<number>, cur: boolean, idx: number) =>
          cur ? acc.concat(idx) : acc,
        []
      );
      const chosenElements = indices.map((idx: number) => elementSymbols[idx]);
      const searchResults = searchMineralsByElements(chosenElements);
      setResults(searchResults);
    }
  };

  return (
    <>
      <Menu />
      <Wrapper>
        <PeriodicTable
          selectElement={selectElement}
          selectedElements={selectedElements}
        />
        <div className="button-container">
          <StyledButton onClick={() => searchMineral()}>search</StyledButton>
          <BinButton onClick={() => unselectAllElements()} />
        </div>
        <SearchResults
          setSelectedMineral={setSelectedMineral}
          mineralResults={results}
        />
      </Wrapper>
    </>
  );
};
export default Home;
