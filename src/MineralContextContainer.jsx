import React, { useState } from "react";
import { MineralContext } from "./MineralContext";

// Create a provider for components to consume and subscribe to changes
export const MineralContextContainer = (props) => {
  const [clickedElements, setClickedElements] = useState(Array(120).fill(false));
  const [mineralResults, setMineralResults] = useState(null);
  const [chosenCreatedMineral, setChosenCreatedMineral] = useState(null);

  return (
    <MineralContext.Provider
      value={{
        clickedElements: [clickedElements, setClickedElements],
        mineralResults: [mineralResults, setMineralResults],
        chosenCreatedMineral: [chosenCreatedMineral, setChosenCreatedMineral],
      }}
    >
      {props.children}
    </MineralContext.Provider>
  );
};
