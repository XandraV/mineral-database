import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { AccordionDetails } from '@material-ui/core'
import { AccordionSummary } from '@material-ui/core'
import { Accordion } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components/macro";

const StyledExpansionPanel = styled.div`
  margin: 0.3rem;
  div > #panel1bh-header {
    height: 3rem;
  }
  div > #panel1bh-header > .MuiAccordionSummary-content > p {
    color: rgb(152, 150, 150);
    font-size: 15px;
    font-weight: bold;
  }
`;

function ExpansionPanel(props) {
  const [expanded, setExpanded] = useState(props.expanded);
  const handleChange = () => (event, isExpanded) => {
    setExpanded(isExpanded ? true : false);
  };
  return (
    <StyledExpansionPanel>
      <Accordion
        style={{
          width: props.width || 750,
          borderRadius: 15,
          margin: "0 auto",
        }}
        expanded={expanded === true}
        onChange={handleChange()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 10 }}>
          {props.value}
        </AccordionDetails>
      </Accordion>
    </StyledExpansionPanel>
  );
}

export default ExpansionPanel;
