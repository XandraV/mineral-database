import { createContext, useState, FC } from "react";

export type MineralContextType = {
  clickedElements: Array<boolean> | null;
  mineralResults: string | null;
  chosenMineral: any | null;
  activeMenu: string;
  setClickedElements:(newElements: any) => void;
  setMineralResults: (newResult: string) => void;
  setChosenMineral: (newMineral: any) => void;
  setActiveMenu: (newMenu: string) => void;
};

export const MineralContext = createContext<MineralContextType>({
  clickedElements: [],
  mineralResults: "",
  chosenMineral: {},
  activeMenu: "HOME",
  setClickedElements: (newElements: any) =>  {},
  setMineralResults: (result: string) => {},
  setChosenMineral: (mineral: any) => {},
  setActiveMenu: (menu: string) => {},
});

export const MineralContextProvider: FC = ({ children }) => {
  const [clickedElements, setClickedElements] = useState(
    Array(120).fill(false)
  );
  const [mineralResults, setMineralResults] = useState("");
  const [chosenMineral, setChosenMineral] = useState({});
  const [activeMenu, setActiveMenu] = useState("HOME");
  const initialValue = {
    clickedElements,
    mineralResults,
    chosenMineral,
    activeMenu,
    setClickedElements,
    setMineralResults,
    setChosenMineral,
    setActiveMenu,
  };

  return (
    <MineralContext.Provider value={initialValue}>
      {children}
    </MineralContext.Provider>
  );
};
