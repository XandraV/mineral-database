import React, { FC } from 'react';
import Element from './Element';
import { elements } from './data/periodictable';
import styled from 'styled-components/macro';

const groups = [
  {
    name: 'Non Metal',
    color: 'rgba(255, 203, 221, 0.6)',
  },
  {
    name: 'Alkaline Metal',
    color: 'rgba(211, 79, 115, 0.6)',
  },
  {
    name: 'Alkaline Earth Metal',
    color: 'rgba(255, 180, 91, 0.7)',
  },
  {
    name: 'Transition Metal',
    color: 'rgba(101, 79, 139, 0.7)',
  },
  {
    name: 'Post Transition Metal',
    color: 'rgba(126,142,201,0.6)',
  },
  {
    name: 'Metalloid',
    color: 'rgba(131,219,249,0.7)',
  },
  {
    name: 'Halogen',
    color: 'rgba(255,67,157,0.6)',
  },
  {
    name: 'Noble Gas',
    color: 'rgb(244, 205, 252, 0.6)',
  },
];

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

  @-webkit-keyframes slide-in-blurred-top {
    0% {
      -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0) scaleY(1) scaleX(1);
      transform: translateY(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-blurred-top {
    0% {
      -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0) scaleY(1) scaleX(1);
      transform: translateY(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }

  -webkit-animation: slide-in-blurred-top 1s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation: slide-in-blurred-top 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  justify-content: center;
  padding: 0 5vw 0 15vw;
  position: absolute;
`;

type StyledTagProps = {
  color: string;
};

const StyledTag = styled.div<StyledTagProps>`
  height: 24px;
  margin: 6px 4px 0 0;
  display: inline;
  background-color: ${({ color }) => color};
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 16px;
  padding: 4px 8px 4px 8px;
  border-radius: 2px;
  box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.25);
`;

type PeriodicTableProps = {
  selectElement: any;
  selectedElements: any;
};

const PeriodicTable: FC<PeriodicTableProps> = ({
  selectElement,
  selectedElements,
}) => {
  let periodicTable = [];
  for (let element_num = 1; element_num < 58; element_num++) {
    periodicTable.push(
      <Element
        key={element_num}
        value={elements[element_num]}
        onClick={() => selectElement(element_num)}
        selected={selectedElements[element_num]}
      />
    );
  }
  for (let element_num = 72; element_num < 90; element_num++) {
    periodicTable.push(
      <Element
        key={element_num}
        value={elements[element_num]}
        onClick={() => selectElement(element_num)}
        selected={selectedElements[element_num]}
      />
    );
  }
  for (let element_num = 104; element_num < 119; element_num++) {
    periodicTable.push(
      <Element
        key={element_num}
        value={elements[element_num]}
        onClick={() => selectElement(element_num)}
        selected={selectedElements[element_num]}
      />
    );
  }

  return (
    <PeriodicTableWrapper>
      <GroupWrapper>
        {groups.map(({ name, color }) => (
          <StyledTag color={color}>{name}</StyledTag>
        ))}
      </GroupWrapper>

      <section className='card1'>{periodicTable}</section>
    </PeriodicTableWrapper>
  );
};

export default PeriodicTable;
