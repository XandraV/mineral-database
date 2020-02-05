import React from "react";
import Button from "@material-ui/core/Button";
function CreateMineralButton(props) {
  return (
    <Button
      variant="contained"
      className="button-create"
      onClick={props.onClick}
    >
      Create mineral
    </Button>
  );
}
export default CreateMineralButton;
