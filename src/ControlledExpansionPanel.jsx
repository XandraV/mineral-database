import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components/macro";

const StyledExpansionPanel = styled.div`
  margin: 0.3rem;
  div > #panel1bh-header {
    height: 3rem;
  }
  div> #panel1bh-header > .MuiExpansionPanelSummary-content > p {
    padding-top: 10px;
    color: rgb(152, 150, 150);
    font-size: 15px;
    font-weight: bold;
  }
`;

function ControlledExpansionPanel(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <StyledExpansionPanel>
      <ExpansionPanel
        style={{
          width: props.width || 750,
          borderRadius: 15,
          margin: "0 auto",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 10 }}>
          {props.value}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </StyledExpansionPanel>
  );
}

export default ControlledExpansionPanel;
