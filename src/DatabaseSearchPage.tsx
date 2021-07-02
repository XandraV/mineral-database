import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  height: ${window.innerHeight * 0.8}px;
`;

const Title = styled.div`
  font-size: 50px;
  margin-bottom: 40px;
  font-weight: 700;
  display: flex;
  color: white;
`;

const DatabaseSearchPage = () => {
  return (
    <Wrapper>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={11}>
          <Title>Mineral Search</Title>
        </Grid>

        <Grid item xs={11} style={{ paddingTop: 70 }}></Grid>
      </Grid>
    </Wrapper>
  );
};

export default DatabaseSearchPage;
