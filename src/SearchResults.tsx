import React, { FC } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

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
function colorMap(myColor: string) {
  switch (myColor) {
    case "yellow":
      return "#ffd452";
    case "green":
      return "#c5e1a5";
    case "red":
      return "#ef5350";
    case "blue":
      return "#81d4fa";
    case "black":
    case "grey":
      return "#9fa8da";
    case "Colourless":
    case "white":
      return "#c9c2d4";
    case "pink":
      return "#f48fb1";
    case "violet":
    case "purple":
      return "#ce93d8";
    case "brown":
      return "#bcaaa4";
    case "orange":
      return "#ffab91";
    default:
      return "#80deea";
  }
}

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
                <StyledPaper color={colorMap(mineral.color[0].toLowerCase())}>
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
