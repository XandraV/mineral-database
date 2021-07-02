import React, { useContext, useEffect } from "react";
import BinButton from "./BinButton";
import PeriodicTable from "./PeriodicTable";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import { MineralContext } from "./MineralContextProvider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components/macro";
import { elements } from "./data/periodictable";
import { minerals } from "./data/minerals";
import images from "./images";

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  height: ${window.innerHeight - 170}px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 20px;
  img.background {
    opacity: 0.12;
    position: absolute;
    top: 150px;
    left: -200px;
  }
  .button-container {
    padding: 1rem;
  }
`;

const Title = styled.div`
  font-size: 38px;
  font-family: Rosario;
  font-weight: 700;
  color: white;
  margin-left: 4vw;
  float: left;
  display: inline-block;
`;

const StyledCard = styled(Card)`
  && {
    background: #ffffff1a;
  }
  display: inline-block;
  width: 150px;
  height: 90px;
  vertical-align: middle;
  margin-right: 4vw;
  float: right;
  div {
    font-weight: 700;
    font-style: italic;
    color: white;
  }
`;

const PeriodicTablePage = () => {
  const {
    clickedElements,
    mineralResults,
    setClickedElements,
    setMineralResults,
  } = useContext<any>(MineralContext);

  useEffect(() => {
    if (document.getElementById("scroller")) {
      document
        .getElementById("scroller")!
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mineralResults]);

  const selectElement = (elementNum: number) => {
    let items = [...clickedElements];
    let item = !items[elementNum];
    items[elementNum] = item;
    setClickedElements(items);
  };

  const unselectAllElements = () => {
    setClickedElements(Array(120).fill(false));
    setMineralResults(null);
  };

  const searchMineralsByElements = (arrayOfElements: Array<object>) => {
    const resultList = [];
    if (arrayOfElements.length > 0) {
      for (let mineralObj of minerals) {
        if (
          arrayOfElements.every((elem: any) =>
            mineralObj.formula.includes(elem)
          )
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
    setMineralResults(null);
    if (clickedElements.every((element: boolean) => element === false)) return;
    else {
      const indices = clickedElements.reduce(
        (acc: Array<number>, cur: boolean, idx: number) =>
          cur ? acc.concat(idx) : acc,
        []
      );
      const chosenElements = indices.map((idx: number) => elementSymbols[idx]);
      const searchResults = searchMineralsByElements(chosenElements);
      setMineralResults(searchResults);
    }
  };

  return (
    <Wrapper>
      <img
        className="background"
        src={(images as any)["atom"]}
        alt={"Atom"}
        width={600}
        height={600}
      />
      <div>
        <Title>The Periodic Table of Elements</Title>
        <StyledCard>
          <CardContent>Select elements to search for minerals!</CardContent>
        </StyledCard>
      </div>

      <PeriodicTable
        selectElement={selectElement}
        selectedElements={clickedElements}
      />
      <div className="button-container">
        <SearchButton onClick={() => searchMineral()} />
        <BinButton onClick={() => unselectAllElements()} />
      </div>
      <SearchResults mineralResults={mineralResults} />
    </Wrapper>
  );
};
export default PeriodicTablePage;
