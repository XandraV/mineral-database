import React from "react";
import { getColorInTable } from "./helpers";
import styled from "styled-components/macro";
const StyledNumber = styled.div`
  float: left;
  margin: 2px;
  font-size: 1vw;
  position: absolute;
}`;

const StyledSymbol = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 1vw;
  font-size: 2vw;
`;

const StyledElementName = styled.div`
  font-size: 0.8vw;
  text-align: center;
`;

const StyledSelectedElement = styled.div`
  background-color: white;
  color: ${(props) => props.elementColor};
  border-color: ${(props) => props.elementColor};
  cursor: pointer;
  width: 5vw;
  height: 5.5vw;
  padding: 2px;
  border: 0.09em dashed ${(props) => props.elementColor};
  border-radius: 10px;
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
  width: 5vw;
  height: 5.5vw;
  padding: 2px;
  border: 0.09em solid white;
  border-width: 1px;
  border-radius: 10px;
  opacity: 0.7;
  box-shadow: 0px 0px 8px grey;
  :hover {
    box-shadow: 0px 0px 5px #00ffff;
    border: 1px solid #00ffff;
  }
  grid-column-start: ${(props) => {
    if (props.id === "He") return "-2";
    else if (props.id === "B") return "13";
    else if (props.id === "Al") return "13";
  }};
`;

function Element(props) {
  const thisColor = getColorInTable(props.value.symbol);
  return props.selected ? (
    <StyledSelectedElement
      elementColor={thisColor}
      id={props.value.symbol}
      onClick={props.onClick}
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
    >
      <StyledNumber>{props.value.number}</StyledNumber>
      <StyledSymbol>{props.value.symbol}</StyledSymbol>
      <StyledElementName>{props.value.name}</StyledElementName>
    </StyledNotSelectedElement>
  );
}
export default Element;
