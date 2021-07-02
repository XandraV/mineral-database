import React from "react";
import { Link } from "react-router-dom";
import PeriodicTableBackground from "./PeriodicTableBackground";
import crystal from "./images/crystal.svg";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  width: 100%;
  height: ${window.innerHeight - 170}px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 20px;
  padding-left: 40px;
  justify-content: center;
  display: flex;
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Rosario;
  font-weight: 700;
  color: white;
  text-align: center;
  margin: 30px 0 60px 0;
  font-size: 20px;
`;
const IntroText = styled.div`
  font-size: 34px;
  color: white;
  font-weight: 300;
  position: absolute;
  display: inline-block;
  width: 70vw;
  div:nth-child(3) {
    margin: 30px 0 60px 0;
    font-size: 18px;
  }
  img {
    opacity: 0.1;
    transform: rotate(-18deg);
  }
`;

const StyledButton = styled(Link)`
  height: 56px;
  color: white;
  font-size: 21px;
  padding: 10px 30px;
  text-align: center;
  border 2px solid #e18cac;
  border-radius: 40px;
  transition: 0.3s;
  text-decoration: none;
  :hover {
      color: white;
      background: rgb(255, 255, 255, 0.1);
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <IntroText>
        <Title>
          <img
            className="icon"
            src={crystal}
            alt="crystal"
            width={80}
            height={66}
          />
          <div>Database of Minerals</div>
        </Title>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          suscipit vel urna at commodo. Mauris pulvinar laoreet turpis
          consectetur aliquam. Praesent maximus, ligula sed dapibus mattis,
          velit dolor aliquet metus, non posuere mi orci sit amet quam.
        </div>

        <div>
          Quisque quam neque, vulputate eget quam eget, tincidunt hendrerit
          nibh. Etiam quam leo, sagittis quis urna non, sagittis gravida ex.
          Suspendisse id metus et lectus maximus porta eu eget libero. Mauris
          suscipit velit at dolor hendrerit, ut laoreet nisi feugiat. Curabitur
          vestibulum sit amet ante eu vehicula. Integer porttitor ac risus vel
          mattis.
        </div>
        <StyledButton to={"/periodic"}>Search Minerals</StyledButton>
      </IntroText>
      <PeriodicTableBackground />
    </Wrapper>
  );
};

export default Home;
