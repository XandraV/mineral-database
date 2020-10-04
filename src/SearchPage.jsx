import React, { useContext, useState } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "./ExpansionPanel";
import SearchListItem from "./SearchListItem";
import { getAllMinerals, handleSearchMineralsList } from "./helpers";
import  Menu  from "./Menu";
import StyledButton from "./StyledButton";
import styled from "styled-components/macro";
import { MineralContext } from "./MineralContext";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  mineralColors,
  mineralGroups,
} from "./data/searchPageHelperData";

const PageWrapper = styled.main`
  padding-top: 5rem;
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

const ButtonsWrapper = styled.span`
  padding-left: 1em;
  text-align: right;
  padding-top: 10px;
  margin-right: 0.5em;
`;

const Filter = styled.div`
  width: 280px;
  margin: 10px;
  border: 0.5px solid #e4dada;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #e4dada;
`;

const StyledSelect = styled(Select)`
  height: 3px;
  width: 80px;
`;

const StyledFormHelperText = styled(FormHelperText)`
  font-size: 11px;
  font-style: italic;
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
  const [color, setColor] = useState([]);
  const [group, setGroup] = useState([]);

  function updateMineralsList() {
    let newMineralsArray;
    let newMineralsArray2;
    const originalMineralsArray = getAllMinerals();
    const filterColors = color;
    const filterGroups = group;
  
    if (filterColors.length > 0) {
      newMineralsArray = originalMineralsArray.filter((el) => {
        return filterColors.some((elem) => el.color.includes(elem));
      });
    } else {
      newMineralsArray = originalMineralsArray;
    }

    if (filterGroups.length > 0) {
      newMineralsArray2 = newMineralsArray.filter((el) => {
        return filterGroups.some((elem) => el.mainGroup.includes(elem));
      });
    } else {
      newMineralsArray2 = newMineralsArray;
    }
    setResults(newMineralsArray2);
  }

  function handleSelectColor(mycolor) {
    let newselected;
    if (color.indexOf(mycolor) > -1) {
      newselected = color;
      newselected.splice(color.indexOf(mycolor), 1);
    } else {
      newselected = color.concat([mycolor]);
      setColor(newselected);
    }
  }

  function handleDeleteColor(colorToBeDeleted) {
    const newselected = color;
    newselected.splice(color.indexOf(colorToBeDeleted), 1);
    setColor(newselected);
  }

  function handleSelectGroup(mygroup) {
    let newselected;
    if (color.indexOf(mygroup) > -1) {
      newselected = group;
      newselected.splice(group.indexOf(mygroup), 1);
      setGroup(newselected);
    } else {
      newselected = group.concat([mygroup]);
      setGroup(newselected);
    }
  }

  function handleDeleteGroup(groupToBeDeleted) {
    const newselected = group;
    newselected.splice(group.indexOf(groupToBeDeleted), 1);
    setGroup(newselected);
  }

  function resetFilters() {
    setResults(getAllMinerals());
    setColor([]);
    setGroup([]);
  }

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
            <Grid container spacing={2} style={{ display: "block" }}>
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
              <ExpansionPanel
                expanded={false}
                width={340}
                value={
                  <div>
                    <div
                      style={{
                        height: 130,
                        overflow: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <Filter>
                        <FormControl style={{ padding: 10 }}>
                          <StyledFormHelperText>Color</StyledFormHelperText>
                          <StyledSelect multiple value={["", ""]}>
                            {mineralColors.map((color) => (
                              <MenuItem key={color} value={color}>
                                <ListItemText
                                  primary={color}
                                  onClick={() => handleSelectColor(color)}
                                />
                              </MenuItem>
                            ))}
                          </StyledSelect>
                        </FormControl>
                        {color.map((selectedColorElement) => (
                          <Chip
                            label={selectedColorElement}
                            style={{
                              margin: 7,
                              color: "white",
                              backgroundColor: "lightblue",
                            }}
                            onDelete={() =>
                              handleDeleteColor(selectedColorElement)
                            }
                            clickable
                          />
                        ))}
                      </Filter>
                      <Filter>
                        <FormControl style={{ padding: 10 }}>
                          <StyledFormHelperText>Group</StyledFormHelperText>
                          <StyledSelect multiple value={["1", "2"]}>
                            {mineralGroups.map((group) => (
                              <MenuItem key={group} value="">
                                <ListItemText
                                  primary={group}
                                  onClick={() => handleSelectGroup(group)}
                                />
                              </MenuItem>
                            ))}
                          </StyledSelect>
                        </FormControl>
                        {group.map((selectedGroupElement) => (
                          <Chip
                            label={selectedGroupElement}
                            style={{
                              margin: 7,
                              color: "white",
                              backgroundColor: "lightBlue",
                            }}
                            onDelete={() =>
                              handleDeleteGroup(selectedGroupElement)
                            }
                            clickable
                          />
                        ))}
                      </Filter>
                    </div>
                    <ButtonsWrapper>
                      <StyledButton onClick={() => updateMineralsList()}>
                        Apply
                      </StyledButton>
                    </ButtonsWrapper>
                    <StyledButton onClick={() => resetFilters()}>
                      Reset
                    </StyledButton>
                  </div>
                }
                title={"Advanced search"}
              />
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
