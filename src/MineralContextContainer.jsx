import React, { useState } from "react";
import { MineralContext } from "./MineralContext";

// Create a provider for components to consume and subscribe to changes
export const MineralContextContainer = (props) => {
  const [clickedElements, setClickedElements] = useState(Array(120).fill(false));
  const [mineralResults, setMineralResults] = useState(null);
  const [chosenMineral, setchosenMineral] = useState(null);

  return (
    <MineralContext.Provider
      value={{
        clickedElements: [clickedElements, setClickedElements],
        mineralResults: [mineralResults, setMineralResults],
        chosenMineral: [chosenMineral, setchosenMineral],
      }}
    >
      {props.children}
    </MineralContext.Provider>
  );
};
