import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

function ControlledExpansionPanel(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <ExpansionPanel
        style={{ width: props.width, borderRadius: 15, margin: 5 }}
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 10 }}>
          {props.content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default ControlledExpansionPanel;