import React from "react";
import styled from "styled-components/macro";
const StyledFormula = styled.div`
  padding-left: 0.5em;
  padding-right: 1em;
  font-size: 1em;
  color: white;
`;

{/* <Formula
  className="formula-html"
  chosenMineral={mychosenMineral}
/>; */}

function Formula(props) {
  return (
    <StyledFormula
      dangerouslySetInnerHTML={{
        __html: `${
          props.chosenMineral.formulaWeb
        }`,
      }}
    />
  );
}

export default Formula;
