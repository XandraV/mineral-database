import React from 'react';
import Crystal3D from './Crystal3D';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  height: ${window.innerHeight}px;
  div:first-child {
    display: inline-block;
    margin-top: 20%;
  }
`;

const LoadingText = styled.div`
  :after {
    color: #969698;
    font-weight: bold;
    content: 'Loading';
    animation: changeText 3s linear infinite;
  }
  @keyframes changeText {
    0% {
      content: 'Loading';
    }
    25% {
      content: 'Loading.';
    }
    50% {
      content: 'Loading..';
    }
    75% {
      content: 'Loading...';
    }
  }
  @keyframes loading {
    0% {
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
    45% {
      -webkit-transform: translateX(225px);
      transform: translateX(225px);
    }
    65% {
      -webkit-transform: translateX(225px);
      transform: translateX(225px);
    }
    95% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
`;

const LoadingPage = () => {
  return (
    <>
      <Wrapper>
        <div id='crystal-3d'>
          <Crystal3D
            width={300}
            height={300}
            shaderName={'pink'}
            rotationSpeed={10}
          />
        </div>
        <LoadingText />
      </Wrapper>
    </>
  );
};
export default LoadingPage;
