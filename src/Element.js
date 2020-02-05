import React from "react";
import { getColorInTable } from "./helpers";
function Element(props) {
    const thisColor = getColorInTable(props.value.symbol);
    return (
      <div
        style={{
          backgroundColor:
            props.className === "selected-element" ? "white" : thisColor,
          color: props.className === "selected-element" ? thisColor : "white",
          borderColor:
            props.className === "selected-element" ? thisColor : "white",
          borderStyle: props.className === "selected-element" ? "dashed" : "solid"
        }}
        id={props.value.symbol}
        className={props.className}
        onClick={props.onClick}
      >
        <div className="number">{props.value.number}</div>
        <div className="symbol">{props.value.symbol}</div>
        <div className="element-name">{props.value.name}</div>
      </div>
    );
  }
export default Element;