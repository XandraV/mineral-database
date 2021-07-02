import React, { FC, useContext } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Grid from "@material-ui/core/Grid";
import { MineralContext } from "./MineralContextProvider";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const StyledGrid = styled(Grid)`
  && {
    max-width: 50rem;
    display: inline-flex;
    text-align: left;
    margin-top: 20px;
    position: relative;
  }
`;

const StyledLink = styled(Link)`
  padding-top: 12px;
  font-size: 19px;
  font-family: Rosario;
  font-weight: 300;
  color: white;
  text-decoration: none;
  svg.MuiSvgIcon-root {
    font-size: 12px;
    margin-left: 10px;
  }

  :hover {
    border-bottom: 1px solid white;
  }
`;

const ResultCount = styled.div`
  text-align: center;
  color: white;
  padding-bottom: 10px;
  padding-top: 10px;
`;

type SearchResultsProps = {
  mineralResults: any;
};

const SearchResults: FC<SearchResultsProps> = ({ mineralResults }) => {
  const { setChosenMineral } = useContext<any>(MineralContext);

  return mineralResults ? (
    <>
      {mineralResults.length === 0 && (
        <ResultCount id="scroller">No results found</ResultCount>
      )}
      <StyledGrid id="scroller" container justify="center" spacing={2}>
        {mineralResults.map(
          (mineral: { color: Array<string>; name: string }) => (
            <Grid item xs={3} key={mineral.name}>
              <StyledLink
                to="/mineral-results"
                onClick={() => setChosenMineral(mineral)}
              >
                <span>{mineral.name}</span>
                <ArrowForwardIosIcon />
              </StyledLink>
            </Grid>
          )
        )}
      </StyledGrid>
    </>
  ) : (
    <div />
  );
};
export default SearchResults;
