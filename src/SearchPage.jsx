import React, { useContext, useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import SearchListItem from "./SearchListItem";
import { getAllMinerals, handleSearchMineralsList } from "./helpers";
import { Menu } from "./Menu";
import StyledButton from "./StyledButton";
import styled from "styled-components/macro";
import { MineralContext } from "./MineralContext";
import "./App.css";

const PageWrapper = styled.main`
  padding-top: 100px;
`;

const ButtonWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;
const StyledCard = styled(Card)`
  height: 140px;
  width: 300px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
`;

const StyledGrid = styled(Grid)`
  height: 350px;
  flex-grow: 1;
  overflow: auto;
`;
function SearchPage() {
  const { chosenCreatedMineral } = useContext(MineralContext);
  const [
    myChosenCreatedMineral,
    setMyChosenCreatedMineral,
  ] = chosenCreatedMineral;
  const originalList = getAllMinerals();
  const [value, setValue] = useState("");
  const [results, setResults] = useState(originalList);
  const [limit, setLimit] = useState(8);

  const searchBar = {
    width: 500,
    borderRadius: 15,
  };

  return (
    <MuiThemeProvider>
      <div>
        <Menu title="Mineral Search" />
        <PageWrapper>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item style={{ paddingLeft: 380 }}>
                <SearchBar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  onRequestSearch={() =>
                    setResults(handleSearchMineralsList(value))
                  }
                  style={searchBar}
                />
              </Grid>
            </Grid>
          </Container>
          <Container
            maxWidth="lg"
            style={{ padding: 20, position: "absolute" }}
          >
            <StyledGrid
              container
              justify="center"
              spacing={2}
              alignItems="center"
            >
              {results.slice(0, limit).map((rock) => (
                <Grid item key={rock.name}>
                  <StyledCard>
                    <CardActionArea
                      onClick={() => setMyChosenCreatedMineral(rock)}
                    >
                      <SearchListItem
                        mineral={rock}
                        onClick={() => setMyChosenCreatedMineral(rock)}
                      />
                    </CardActionArea>
                  </StyledCard>
                </Grid>
              ))}
            </StyledGrid>
            <ButtonWrapper>
              <StyledButton onClick={() => setLimit(limit + 8)}>
                Load more
              </StyledButton>
            </ButtonWrapper>
          </Container>
        </PageWrapper>
      </div>
    </MuiThemeProvider>
  );
}

export default SearchPage;
