import React, { FC } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { getSearchResultColor } from "./helpers";

const StyledPaper = styled(Paper)`
  background: ${(props) => props.color};
  border: 0.09em solid white;
  color: white;
  height: 3rem;
  border-radius: 0.6rem;
  padding: 10px 20px;
  vertical-align: middle;
  text-align: left;
  font-size: 1rem;
  text-decoration: none;
  font-weight: bold;
  opacity: 0.9;
  span {
    vertical-align: middle;
  }
  .MuiSvgIcon-root {
    float: right;
  }
  :hover {
    border: 0.09em solid ${(props) => props.color};
  }
`;
const ResultCount = styled.div`
  text-align: center;
  color: black;
  padding-bottom: 10px;
  padding-top: 10px;
`;
type SearchResultsProps = {
  mineralResults: any;
  setSelectedMineral: any;
};
const SearchResults: FC<SearchResultsProps> = ({
  mineralResults,
  setSelectedMineral,
}) => {
  return mineralResults ? (
    <>
      <ResultCount id="scroller">{`${mineralResults.length} results`}</ResultCount>
      <Grid
        container
        justify="center"
        spacing={2}
        alignItems="center"
        style={{ maxWidth: "50rem", display: "inline-flex" }}
      >
        {mineralResults.map(
          (mineral: { color: Array<string>; name: string }) => (
            <Grid item xs={12} sm={4}>
              <Link
                className="link"
                to="/mineral-results"
                onClick={() => setSelectedMineral(mineral)}
                style={{ textDecoration: "none" }}
              >
                <StyledPaper
                  color={getSearchResultColor(mineral.color[0].toLowerCase())}
                >
                  <span>{mineral.name}</span>
                  <ArrowForwardIcon />
                </StyledPaper>
              </Link>
            </Grid>
          )
        )}
      </Grid>
    </>
  ) : (
    <div />
  );
};
export default SearchResults;
