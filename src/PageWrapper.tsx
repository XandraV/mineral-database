import styled from "styled-components/macro";

export const HomePageWrapper = styled.div`
  background: #e2d6f6;
  height: ${window.innerHeight}px;
  overflow-x: hidden;
  display: flex;
  .home-container {
    text-align: center;
    margin-left: 60px;
  }
  .button-container {
    padding: 1rem;
  }
`;

export const InfoPageWrapper = styled.div`
  background: #e2d6f6;
  height: 100vh;
`;

// #584f69
export const StatsPageWrapper = styled.div`
  background: #e2d6f6;
  overflow-x: hidden;
  width: 100%;
  .home-container {
    height: ${window.innerHeight}px;
    padding-top: 2rem;
    text-align: center;
    display: inline-block;
    margin-left: 6rem;
  }
  .button-container {
    padding: 2rem;
  }
`;
