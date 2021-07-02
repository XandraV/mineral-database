import React from 'react';
import styled from 'styled-components/macro';

const IconWrapper = styled.div`
  padding-top: 0.5rem;

  @-webkit-keyframes wobble-hor-bottom {
    0%,
    100% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    15% {
      -webkit-transform: translateX(-10px) rotate(-6deg);
      transform: translateX(-10px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(5px) rotate(6deg);
      transform: translateX(5px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-5px) rotate(-3.6deg);
      transform: translateX(-5px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(3px) rotate(2.4deg);
      transform: translateX(3px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-3px) rotate(-1.2deg);
      transform: translateX(-3px) rotate(-1.2deg);
    }
  }
  @keyframes wobble-hor-bottom {
    0%,
    100% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    15% {
      -webkit-transform: translateX(-10px) rotate(-6deg);
      transform: translateX(-10px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(5px) rotate(6deg);
      transform: translateX(5px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-5px) rotate(-3.6deg);
      transform: translateX(-5px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(3px) rotate(2.4deg);
      transform: translateX(3px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-2px) rotate(-1.2deg);
      transform: translateX(-2px) rotate(-1.2deg);
    }
  }

  -webkit-animation: wobble-hor-bottom 1s 2s infinite both;
  animation: wobble-hor-bottom 1s 2s infinite both;
`;

const CrystalIcon = () => {
  return (
    <>
      <IconWrapper>
        <img
          alt='icon'
          src={`https://crystallizer.s3.eu-west-2.amazonaws.com/crystallizer.ico`}
          width={30}
          height={30}
        />
      </IconWrapper>
    </>
  );
};

export default CrystalIcon;
