import styled from "styled-components/macro";

export const HomePageWrapper = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg");
  height: ${window.innerHeight}px;
  overflow-x: hidden;
  .home-container {
    padding-top: 2rem;
    text-align: center;
    display: inline-block;
    flex-grow: 1;
    padding-left: 4rem;
    height: ${window.innerHeight}px;
  }
  .button-container {
    padding: 2rem;
  }
`;

export const InfoPageWrapper = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg");
  height: ${window.innerHeight}px;
`;

export const StatsPageWrapper = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200% 200%;
  background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/circle2.svg");
  height: ${window.innerHeight}px;
  overflow-x: hidden;
  .home-container {
    padding-top: 2rem;
    text-align: center;
    display: inline-block;
    flex-grow: 1;
    padding-left: 4rem;
    height: ${window.innerHeight}px;
  }
  .button-container {
    padding: 2rem;
  }
`;
