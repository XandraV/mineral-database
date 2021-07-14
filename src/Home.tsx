import React from "react";
import { Link } from "react-router-dom";
import PeriodicTableBackground from "./PeriodicTableBackground";
import crystal from "./images/crystal.svg";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  width: 100%;
  height: ${window.innerHeight}px;
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
  margin: 90px 0 60px 0;
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
    opacity: 0.2;
    transform: rotate(-18deg);
  }
`;

const StyledButton = styled(Link)`
  height: 56px;
  color: white;
  font-size: 21px;
  padding: 10px 30px;
  text-align: center;
  border 2px solid #faf0c7;
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
          A mineral is defined as a naturally occurring solid with specific
          chemical composition and distinctive internal crystal structure.
          Minerals are usually formed by inorganic processes, although there are
          organically produced substances that are also considered minerals.
        </div>

        <div>
          Certain substances, including opal and glass, resemble minerals in
          chemistry and occurrence but do not have a regularly ordered internal
          arrangement. These are known as mineraloids. There are more than 5000
          known minerals and this database contains information on nearly 800 of
          them including chemical formulas, crystal systems and structures.
        </div>
        <StyledButton to={"/periodic"}>Search Minerals</StyledButton>
      </IntroText>
      <PeriodicTableBackground />
    </Wrapper>
  );
};

export default Home;
