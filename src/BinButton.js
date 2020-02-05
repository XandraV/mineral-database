import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
function BinButton(props) {
  return (
    <IconButton className="bin" onClick={props.onClick}>
      <DeleteOutlinedIcon
        style={{ color: "black" }}
        className="material-icons"
      />
    </IconButton>
  );
}
export default BinButton;
