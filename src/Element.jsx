import React from "react";
import styled from "styled-components/macro";

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

const StyledSelectedElement = styled.div`
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
const StyledNotSelectedElement = styled.div`
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

function Element(props) {
  const rand = Math.floor(Math.random() * 120);
  const thisColor = getColor(props.value.symbol);
  return props.selected ? (
    <StyledSelectedElement
      elementColor={thisColor}
      id={props.value.symbol}
      onClick={props.onClick}
      randInt={rand}
    >
      <StyledNumber>{props.value.number}</StyledNumber>
      <StyledSymbol>{props.value.symbol}</StyledSymbol>
      <StyledElementName>{props.value.name}</StyledElementName>
    </StyledSelectedElement>
  ) : (
    <StyledNotSelectedElement
      elementColor={thisColor}
      id={props.value.symbol}
      onClick={props.onClick}
      randInt={rand}
    >
      <StyledNumber>{props.value.number}</StyledNumber>
      <StyledSymbol>{props.value.symbol}</StyledSymbol>
      <StyledElementName>{props.value.name}</StyledElementName>
    </StyledNotSelectedElement>
  );
}

export function getColor(symbol) {
  switch (symbol) {
    case "H":
    case "C":
    case "N":
    case "O":
    case "P":
    case "S":
    case "Se":
      return "#f48fb1";
    case "Li":
    case "Na":
    case "K":
    case "Rb":
    case "Cs":
    case "Fr":
      return "hsl(174, 72%, 56%)";
    case "Be":
    case "Mg":
    case "Ca":
    case "Sr":
    case "Ba":
    case "Ra":
      return "hsl(333, 100%, 62%)";
    case "Al":
    case "Ga":
    case "In":
    case "Sn":
    case "Tl":
    case "Pb":
    case "Bi":
    case "Nh":
    case "Fl":
    case "Mc":
    case "Lv":
      return "hsl(40, 100%, 53%)";
    case "B":
    case "Si":
    case "Ge":
    case "As":
    case "Te":
    case "Po":
    case "Sb":
      return "hsl(181, 100%, 41%)";
    case "F":
    case "Cl":
    case "Br":
    case "I":
    case "At":
    case "Ts":
      return "hsl(66, 75%, 54%)";
    case "He":
    case "Ne":
    case "Ar":
    case "Kr":
    case "Xe":
    case "Rn":
    case "Og":
      return "hsl(194, 87%, 67%)";
    default:
      return "hsl(210, 99%, 69%)";
  }
}

export default Element;
