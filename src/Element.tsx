import React, { FC } from "react";
import { getElementColor } from "./helpers";
import styled from "styled-components/macro";

type StyledElementProps = {
  elementColor: string;
};

const StyledNumber = styled.div`
float: left;
margin: 4px;
margin-left: 9px;
font-size: 0.8vw;
position: absolute;
}`;

const StyledSymbol = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 1vw;
  font-size: 1.5vw;
  margin-bottom: -5px;
`;

const StyledElementName = styled.div`
  font-size: 0.6vw;
  text-align: center;
`;

const StyledSelectedElement = styled.div<StyledElementProps>`
  background-color: white;
  color: ${(props) => props.elementColor};
  border-color: ${(props) => props.elementColor};
  cursor: pointer;
  width: 4.6vw;
  height: 4.6vw;
  padding: 2px;
  border: 0.09em dashed ${(props) => props.elementColor};
  border-radius: 60%;
  grid-column-start: ${(props) => {
    if (props.id === "He") return "-2";
    else if (props.id === "B") return "13";
    else if (props.id === "Al") return "13";
  }};
`;

const StyledNotSelectedElement = styled.div<StyledElementProps>`
  background-color: ${(props) => props.elementColor};
  color: white;
  cursor: pointer;
  width: 4.6vw;
  height: 4.6vw;
  padding: 2px;
  border: 0.09em solid white;
  border-radius: 60%;
  opacity: 0.6;
  box-shadow: 0px 0px 8px grey;

  :hover {
    box-shadow: 0px 0px 5px #00ffff;
    border: 1px solid #00ffff;
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
  grid-column-start: ${(props) => {
    if (props.id === "He") return "-2";
    else if (props.id === "B") return "13";
    else if (props.id === "Al") return "13";
  }};
`;

type ElementProps = {
  value: any;
  selected: boolean;
  onClick: any;
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
