import React, { FC } from "react";
import { getElementColor } from "./helpers";
import styled from "styled-components/macro";

type StyledElementProps = {
  elementColor: string;
};

const StyledNumber = styled.div`
  float: left;
  margin-left: 0.4vw;
  font-size: 0.8vw;
  position: absolute;
}`;

const StyledSymbol = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 0.9vw;
  font-size: 1.3vw;
`;

const StyledElementName = styled.div`
  font-size: 0.6vw;
  text-align: center;
`;

const StyledSelectedElement = styled.div<StyledElementProps>`
  background-color: white;
  color: ${({ elementColor }) => elementColor};
  border-color: ${({ elementColor }) => elementColor};
  cursor: pointer;
  width: 4.2vw;
  height: 4.2vw;
  padding: 0.2vw;
  border: 0.09em dashed ${({ elementColor }) => elementColor};
  border-radius: 4px;
  grid-column-start: ${({ id }) => {
    if (id === "He") return "-2";
    else if (id === "B") return "13";
    else if (id === "Al") return "13";
  }};
`;

const StyledNotSelectedElement = styled.div<StyledElementProps>`
  background-color: ${({ elementColor }) => elementColor};
  color: white;
  cursor: pointer;
  width: 4.2vw;
  height: 4.2vw;
  padding: 0.2vw;
  border-radius: 4px;

  :hover {
    box-shadow: 0px 0px 5px #00ffff;
    border: 1px solid white;
    @-webkit-keyframes vibrate-1 {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
      20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
      }
      40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
      }
      60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
      }
      80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
      }
      100% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
    }
    @keyframes vibrate-1 {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
      20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
      }
      40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
      }
      60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
      }
      80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
      }
      100% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
    }
    -webkit-animation: vibrate-1 0.7s linear infinite both;
    animation: vibrate-1 0.7s linear infinite both;
  }
  grid-column-start: ${({ id }) => {
    if (id === "He") return "-2";
    else if (id === "B") return "13";
    else if (id === "Al") return "13";
  }};
`;

type ElementProps = {
  value: any;
  selected?: boolean;
  onClick?: any;
};

const Element: FC<ElementProps> = ({ value, selected, onClick }) => {
  const thisColor = getElementColor(value.symbol);
  return selected ? (
    <StyledSelectedElement
      elementColor={thisColor}
      id={value.symbol}
      onClick={onClick}
    >
      <StyledNumber>{value.number}</StyledNumber>
      <StyledSymbol>{value.symbol}</StyledSymbol>
      <StyledElementName>{value.name}</StyledElementName>
    </StyledSelectedElement>
  ) : (
    <StyledNotSelectedElement
      elementColor={thisColor}
      id={value.symbol}
      onClick={onClick}
    >
      <StyledNumber>{value.number}</StyledNumber>
      <StyledSymbol>{value.symbol}</StyledSymbol>
      <StyledElementName>{value.name}</StyledElementName>
    </StyledNotSelectedElement>
  );
};

export default Element;
