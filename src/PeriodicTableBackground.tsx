import React, { FC } from "react";
import Element from "./Element";
import { elements } from "./data/periodictable";
import styled from "styled-components/macro";

const PeriodicTableWrapper = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  display: inline-block;
  .card1 {
    display: grid;
    grid-template-columns: repeat(18, auto);
    grid-gap: 3px;
    grid-row-gap: 3px;
  }
`;

const StyledElement = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 4vw;
  height: 4vw;
  padding: 0.2vw;
  border-radius: 4px;
  grid-column-start: ${({ id }) => {
    if (id === "He") return "-2";
    else if (id === "B") return "13";
    else if (id === "Al") return "13";
  }};
`;

const PeriodicTableBackground = () => {
  let periodicTable = [];
  for (let element_num = 1; element_num < 58; element_num++) {
    periodicTable.push(
      <StyledElement key={element_num} id={elements[element_num].symbol} />
    );
  }
  for (let element_num = 72; element_num < 90; element_num++) {
    periodicTable.push(
      <StyledElement key={element_num} id={elements[element_num].symbol} />
    );
  }
  for (let element_num = 104; element_num < 119; element_num++) {
    periodicTable.push(
      <StyledElement key={element_num} id={elements[element_num].symbol} />
    );
  }

  return (
    <PeriodicTableWrapper>
      <section className="card1">{periodicTable}</section>
    </PeriodicTableWrapper>
  );
};

export default PeriodicTableBackground;
