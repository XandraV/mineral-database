import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import BinButton from "./BinButton";
import StyledButton from "./StyledButton";
import Container from "@material-ui/core/Container";
import Element from "./Element";
import Grid from "@material-ui/core/Grid";
import MineralLink from "./MineralLink";
import Paper from "@material-ui/core/Paper";
import { Menu } from "./Menu";
import { elements } from "./data/periodic-table";
import { searchMineralsByElements } from "./helpers";
import styled from "styled-components/macro";
import { MineralContext } from "./MineralContext";

const ResultWrapper = styled(Paper)` 
    text-align: "center";
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    padding-top: 6px;
    padding-left: 6px;
    flex-direction: column;
    height: 50px;
    width: 250px;
    box-shadow: 0px 0px 8px grey;
    background-image: url("https://i2.wp.com/www.123freevectors.com/wp-content/original/131393-abstract-light-blue-triangle-geometric-background.jpg?w=800&q=95");
`;

const HomeWrapper = styled.div`
  .home-container {
    padding-top: 70px;
    padding-left: 20px;
  }
  .table-wrapper {
    text-align: center;
    display: inline-block;
    flex-grow: 1;
    padding-left: 50px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .table-background {
    background-position: center;
    background-position-y: 10px;
    background-repeat: no-repeat;
    background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/grey.svg");
  }
  .card1 {
    display: grid;
    grid-template-columns: repeat(18, auto);
    grid-gap: 1.5px;
    padding: 10px;
  }
  .button-container {
    padding: 1.25em;
  }
`;

const ResultCount = styled.div`
  text-align: center;
  color: black;
  padding-bottom: 10px;
  padding-top: 10px;
`;

function Home() {
  const { clickedElements, mineralResults, chosenCreatedMineral } = useContext(
    MineralContext
  );
  const [myClickedElements, setMyClickedElements] = clickedElements;
  const [myMineralResults, setMyMineralResults] = mineralResults;
  const [
    myChosenCreatedMineral,
    setMyChosenCreatedMineral,
  ] = chosenCreatedMineral;

  function handleElementClick(elementNum) {
    let items = [...myClickedElements];
    let item = !items[elementNum];
    items[elementNum] = item;
    setMyClickedElements(items);
  }

  function deleteElements() {
    setMyClickedElements(Array(120).fill(false));
    setMyMineralResults(null);
  }

  const PeriodicTable = () => {
    let periodicTable = [];
    for (let element_num = 1; element_num < 58; element_num++) {
      periodicTable.push(
        <Element
          key={element_num}
          value={elements[element_num]}
          onClick={() => handleElementClick(element_num)}
          selected={myClickedElements[element_num]}
        />
      );
    }
    for (let element_num = 72; element_num < 90; element_num++) {
      periodicTable.push(
        <Element
          key={element_num}
          value={elements[element_num]}
          onClick={() => handleElementClick(element_num)}
          selected={myClickedElements[element_num]}
        />
      );
    }
    for (let element_num = 104; element_num < 119; element_num++) {
      periodicTable.push(
        <Element
          key={element_num}
          value={elements[element_num]}
          onClick={() => handleElementClick(element_num)}
          selected={myClickedElements[element_num]}
        />
      );
    }
    return <section className="card1">{periodicTable}</section>;
  };

  function createMineral() {
    const elementSymbols = elements.slice().map((el) => {
      return el.symbol;
    });
    setMyMineralResults(null);
    if (myClickedElements.every((el) => el === false)) {
      return;
    } else {
      const indices = myClickedElements.reduce(
        (out, bool, index) => (bool ? out.concat(index) : out),
        []
      );
      const chosenElements = indices.map((index) => {
        return elementSymbols[index];
      });
      const searchResults = searchMineralsByElements(chosenElements);
      setMyMineralResults(searchResults);
    }
  }

  function chooseMineral(mineral) {
    setMyChosenCreatedMineral(mineral);
    localStorage.setItem(
      "chosenCreatedMineral",
      JSON.stringify(myChosenCreatedMineral)
    );
  }

  function renderResults(resultsArray) {
    if (resultsArray) {
      return (
        <Container maxWidth="lg" style={{ padding: 20 }}>
          <Grid container justify="center" spacing={2} alignItems="center">
            {resultsArray.map((mineral) => (
              <Grid item>
                <ResultWrapper>             
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar
                          alt="mineral"
                          src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${mineral.color[0].toLowerCase()}.svg`}
                        />
                      </Grid>
                      <Grid item>
                        <div>
                          <MineralLink onClick={() => chooseMineral(mineral)}>
                            {mineral.name}
                          </MineralLink>
                        </div>
                      </Grid>
                    </Grid>
                </ResultWrapper>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }
  }

  return (
    <HomeWrapper>
      <Menu title="Crystallizer" />
      <Container className="home-container" maxWidth="lg">
        <div className="table-wrapper">
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <div className="table-background">
            <PeriodicTable />
          </div>
          <div className="button-container">
            <StyledButton onClick={() => createMineral()}>search</StyledButton>
            <BinButton onClick={() => deleteElements()} />
          </div>
          <ResultCount>
            {myMineralResults != null
              ? `${myMineralResults.length} results`
              : ``}
          </ResultCount>
          {renderResults(myMineralResults)}
        </div>
      </Container>
    </HomeWrapper>
  );
}
export default Home;
